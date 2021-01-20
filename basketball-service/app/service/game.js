/*
 * @Description:
 * @Date: 2021-01-11 17:21:53
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-20 16:56:39
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

  async query(params) {
    const { app } = this;
    const query = JSON.parse(JSON.stringify(params));
    const { pageSize, current } = query;
    delete query.pageSize;
    delete query.current;
    const docs = await app.model.Game.find(query).skip(pageSize * (current - 1)).limit(Number(pageSize));
    // 分页信息
    const pageInfo = {
      total: await app.model.Game.countDocuments(query).exec(),
      pageSize: Number(pageSize),
      current: Number(current),
    };
    return {
      docs,
      pageInfo,
    };

    // app.model.Game.find({}, (err, docs) => {
    //   console.log(docs);
    // });
    // return await app.model.Game.find();
  }

  // 在比赛中添加player
  async addPlayer(data) {
    const { app } = this;
    await app.model.Game.updateOne({ _id: data.gameId }, {
      $push: { playerIds: data },
    });

    // return await app.model.Game.find({ gameStatus: 0 });
  }


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
