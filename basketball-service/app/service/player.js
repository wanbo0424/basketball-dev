/*
 * @Description:
 * @Date: 2021-01-07 15:39:52
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-15 18:34:54
 * @FilePath: \basketball-service\app\service\player.js
 */
'use strict';

const Service = require('egg').Service;

class PlayerService extends Service {
  // 添加报名球员
  async addPlayer(data = {}) {
    const { app } = this;
    // const findPalyer = await app.model.Player.find({ mobile: data.mobile });
    // if (findPalyer && findPalyer.length) {
    //   console.log('找到这个人了', findPalyer);
    //   return app.model.Player.updateOne({ mobile: data.mobile }, { $push: { gameIdList: data.gameId } });
    // }
    // return app.model.Player.create(data, { $push: { gameIdList: data.gameId } });

    return await app.model.Player.create(data);
  }

  // 报名记录列表
  async query(params) {
    const { app } = this;
    const query = JSON.parse(JSON.stringify(params));
    const { pageSize, current } = query;
    delete query.pageSize;
    delete query.current;
    const docs = await app.model.Player.find(query).skip(pageSize * (current - 1)).limit(Number(pageSize));
    // 分页信息
    const pageInfo = {
      total: await app.model.Player.countDocuments(query).exec(),
      pageSize: Number(pageSize),
      current: Number(current),
    };
    return {
      docs,
      pageInfo,
    };
  }

  // 根据openid分组（唯一标识）
  async playerList(params) {
    const { app } = this;
    const query = JSON.parse(JSON.stringify(params));
    const { pageSize, current } = query;
    delete query.pageSize;
    delete query.current;

    const docs = await app.model.Player.aggregate([
      { $group: { _id: '$openId', gameIdList: { $addToSet: '$gameId' } } },
      { $skip: pageSize * (current - 1) },
      { $limit: Number(pageSize) },
    ]);

    const total = await app.model.Player.aggregate([
      { $group: { _id: '$openId', gameIdList: { $addToSet: '$gameId' } } },
      { $count: 'total' },
    ]);
    // 分页信息
    const pageInfo = {
      total: total[0].total,
      pageSize: Number(pageSize),
      current: Number(current),
    };
    // console.log(docs);
    // return docs;

    return {
      docs,
      pageInfo,
    };
  }

  async getCareerList(query) {
    const { app } = this;
    const docs = await app.model.Player.aggregate([
      {
        $lookup: {
          from: 'games',
          localField: 'gameId',
          foreignField: '_id',
          as: 'gamesInfo'
        }
      },
      {
        $match: {openId: query.openId}
      }
    ]);
    console.log(docs)
    return docs[0]
  }


}

module.exports = PlayerService;
