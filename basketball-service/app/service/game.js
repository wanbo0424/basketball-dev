
/*
 * @Description:
 * @Date: 2021-01-11 17:21:53
 * @LastEditors: yinwb
 * @LastEditTime: 2021-06-09 18:26:14
 * @FilePath: \basketball-service\app\service\game.js
 */
'use strict';

const Service = require('egg').Service;
const moment = require('moment');
class GameService extends Service {
  // 添加比赛
  async addGame(data = {}) {
    const { app } = this;
    const { gameDates, gameTimeRanges, gameAddress, ATeamName, BTeamName, latitude, longitude, specificLocation, gameType } = data;
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
            latitude,
            longitude,
            specificLocation,
            gameType,
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
    // if (data.ATeamScore && data.BTeamScore) {
    //   data.gameStatus = 2;
    // }
    const { _id } = await app.model.Game.findOneAndUpdate({ _id: data._id }, {
      $set: data,
    });
    return _id;
  }

  /**
   * @description:
   * @param {*} data
   * @return {*}
   */
  async batchUpdateGame(data = {}) {
    const { app } = this;
    const { gameIds, gameAddress, specificLocation } = data;
    if (gameIds && gameIds.length) {
      for (const e of gameIds) {
        await app.model.Game.updateOne({ _id: e }, {
          $set: { gameAddress, specificLocation },
        });
      }
    }
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
          gameDate: { $last: '$gameDate' },
          gameDates: {
            $push: {
              gameDate: '$gameDate',
              gameId: '$_id',
              gameTimeRange: '$gameTimeRange',
              gameStatus: '$gameStatus',
              latitude: '$latitude',
              longitude: '$longitude',
              price: '$price',
              gameType: '$gameType',
              specificLocation: '$specificLocation',
            },
          },
        },
      },
      { $sort: { gameDate: -1 } },
    ]);
    let newDocs = [];
    if (docs && docs.length) {
      newDocs = docs.filter(item => {
        const hasGame = item.gameDates.some(ele => {
          return new Date(ele.gameDate).getTime() > new Date().getTime();
        });
        return hasGame;
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
              gameStatus: '$gameStatus',
              latitude: '$latitude',
              longitude: '$longitude',
              price: '$price',
              gameType: '$gameType',
              specificLocation: '$specificLocation',
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

  // 同步球馆列表
  async syncAddressList() {
    const { app } = this;
    const addresses = await app.model.Game.aggregate([
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
              gameStatus: '$gameStatus',
              latitude: '$latitude',
              longitude: '$longitude',
              price: '$price',
              specificLocation: '$specificLocation',
            },
          },
        },
      },
    ]);
    const oldAddresses = await app.model.AddressPrice.find();
    const addAddresses = [];
    for (const e of addresses) {
      if (oldAddresses.findIndex(ele => ele.address === e._id) < 0) {
        addAddresses.push({ address: e._id, fullPrice: '', halfPrice: '', gameDate: '$gameDate' });
      }
    }
    if (addAddresses.length) {
      await app.model.AddressPrice.insertMany(addAddresses);
    }
    return await app.model.AddressPrice.find();
  }
  // 获取球馆价格列表
  async getAddressPriceList() {
    const { app } = this;
    const docs = app.model.AddressPrice.find().sort({ gameDate: -1 });
    return docs;
  }
  async queryAddressPrice(query) {
    const { app } = this;
    const docs = app.model.AddressPrice.find(query);
    return docs;
  }
  async setAddressPrice(data) {
    const { app } = this;
    const docs = app.model.AddressPrice.updateOne({ _id: data._id }, {
      $set: { fullPrice: data.fullPrice, halfPrice: data.halfPrice },
    });
    return docs;
  }

  // 定时添加比赛场任务
  async addGameTask() {
    const { app } = this;
    const nextDate = moment(new Date(new Date().getTime() + 12 * 24 * 3600 * 1000)).format('YYYY-MM-DD');
    const times = [ '09:00--11:00', '14:00--16:00' ];
    const games = [];
    times.forEach(item => {
      games.push({
        gameDate: nextDate,
        gameTimeRange: item,
        gameAddress: '春田篮球公园',
        ATeamName: 'A',
        BTeamName: 'B',
        latitude: 34.212833,
        longitude: 108.911597,
        specificLocation: '陕西省西安市雁塔区电子二路荣禾·城市理想东门北50米',
      });
    });
    await app.model.Game.insertMany(games);
  }
}

module.exports = GameService;
