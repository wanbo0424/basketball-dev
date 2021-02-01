/*
 * @Description:
 * @Date: 2021-01-11 17:21:53
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-21 15:51:20
 * @FilePath: \basketball-service\app\service\game.js
 */
'use strict';

const Service = require('egg').Service;

class GameService extends Service {
  async addGame(data = {}) {
    const { app } = this;
    const { _id } = await app.model.Game.create(data);
    return _id;
  }

  async updateGame(data = {}) {
    const { app } = this;
    const { _id } = await app.model.Game.findOneAndUpdate({ _id: data._id }, {
      $set: data,
    });
    return _id;
  }

  // 查询比赛列表
  async query(params) {
    const { app } = this;
    const query = JSON.parse(JSON.stringify(params));
    const { pageSize, current } = query;
    delete query.pageSize;
    delete query.current;

    const docs = await app.model.Game.aggregate([
      {
        $lookup: {
          from: 'players',
          localField: '_id',
          foreignField: 'gameId',
          as: 'playerIds',
        },
      },
      { $skip: pageSize * (current - 1) },
      { $limit: Number(pageSize) },
    ]);
    // const docs = await app.model.Game.find(query).skip(pageSize * (current - 1)).limit(Number(pageSize));
    // // 分页信息
    const pageInfo = {
      total: await app.model.Game.countDocuments(query).exec(),
      pageSize: Number(pageSize),
      current: Number(current),
    };
    return {
      docs,
      pageInfo,
    };
  }

  // 在比赛中添加player
  // async addPlayer(data) {
  //   const { app } = this;
  //   await app.model.Game.updateOne({ _id: data.gameId }, {
  //     $push: { playerIds: data },
  //   });
  // }


  // 将要举行比赛列表
  async ToHeldGameList() {
    const { app } = this;
    return await app.model.Game.find({ gameStatus: 0 });
  }

  // 设置比赛比分
  async scoreSetting(data) {
    const { app } = this;
    const { _id } = await app.model.Game.updateOne({ _id: data._id }, {
      $set: data,
    });
    return _id;
  }

  // 球员分组
  async buildTeam(data) {
    const { app } = this;
    const { _id } = await app.model.Game.updateOne({ _id: data._id }, {
      $set: { ATeamPlayers: data.ATeamPlayers, BTeamPlayers: data.BTeamPlayers },
    });
    return _id;
  }


}

module.exports = GameService;
