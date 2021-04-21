/*
 * @Description:
 * @Date: 2021-01-11 17:21:53
 * @LastEditors: yinwb
 * @LastEditTime: 2021-04-21 14:31:22
 * @FilePath: \basketball-service\app\service\game.js
 */
'use strict';

const Service = require('egg').Service;

class GameService extends Service {
  // 添加比赛
  async addGame(data = {}) {
    const { app } = this;
    const { gameDates, gameTimeRanges, gameAddress, ATeamName, BTeamName } = data;
    const games = [];
    if (gameDates && gameTimeRanges) {
      gameDates.forEach(item => {
        gameTimeRanges.forEach(ele => {
          games.push({
            gameDate: item,
            gameTimeRange: ele,
            gameAddress,
            ATeamName,
            BTeamName,
          });
        });
      });
    }
    // 批量添加比赛
    const docs = await app.model.Game.insertMany(games);
    // const { _id } = await app.model.Game.create(data);
    return docs;
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


  // 将要举行比赛列表【小程序】
  async ToHeldGameList() {
    const { app } = this;
    const docs = await app.model.Game.aggregate([
      {
        $group: {
          _id: '$gameAddress',
          gameDate: { $first: '$gameDate' },
          gameDates: {
            $push: {
              gameDate: '$gameDate',
              gameId: '$_id',
              gameTimeRange: '$gameTimeRange',
            },
          },
        },
      },
      { $sort: { gameDate: -1 } },
    ]);
    let newDocs = [];
    if (docs && docs.length) {
      newDocs = docs.filter(item => {
        if (item.gameDate) {
          return new Date(item.gameDate).getTime() > new Date().getTime();
        }
        return false;

      });
    }
    return newDocs;
  }

  // 将要举行比赛地点列表
  async ToHeldGameAddresses() {
    const { app } = this;
    return await app.model.Game.aggregate([
      {
        $group: {
          _id: '$gameAddress',
          currentGames: { $push: { gameId: '$_id', gameDate: '$gameDate' } },
        },
      },

    ]);
  }

  // 设置比赛比分
  async scoreSetting(data) {
    const { app } = this;
    const { _id } = await app.model.Game.updateOne({ _id: data._id }, {
      $set: data,
    });
    return _id;
  }

  // 球员组队（废弃）
  async buildTeam(data) {
    const { app } = this;
    const { _id } = await app.model.Game.updateOne({ _id: data._id }, {
      $set: { ATeamPlayers: data.ATeamPlayers, BTeamPlayers: data.BTeamPlayers },
    });
    return _id;
  }


  // 按照比赛地点分组查询
  async gameListByAddress(params) {
    const { app } = this;
    const query = JSON.parse(JSON.stringify(params));
    const { pageSize, current } = params;
    delete query.pageSize;
    delete query.current;
    const docs = await app.model.Game.aggregate([
      {
        $group: {
          _id: '$gameAddress',
          gameDate: { $first: '$gameDate' },
          gameDates: {
            $push: {
              gameDate: '$gameDate',
              gameId: '$_id',
              gameTimeRange: '$gameTimeRange',
              ATeamName: '$ATeamName',
              BTeamName: '$BTeamName',
              ATeamScore: '$ATeamScore',
              BTeamScore: '$BTeamScore',
            },
          },
        },
      },
      { $sort: { gameDate: -1 } },
      { $skip: pageSize * (current - 1) },
      { $limit: Number(pageSize) },
    ]);
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
}

module.exports = GameService;
