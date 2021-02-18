/*
 * @Description:
 * @Date: 2021-01-07 15:39:52
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-25 15:46:52
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

    const result = await app.model.Player.create(data);
    // 创建订单
    const orderData = {
      out_trade_no: data.out_trade_no,
      openId: data.openId,
      creatorName: data.nickName,
      gameId: data.gameId,
      status: 0,
      order_id: '',
      transaction_id: '',
      total_fee: '',
      time_end: '',
    };
    await app.model.Order.create(orderData);
    return result._id;
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

  // 球员个人生涯列表
  async getCareerList(query) {
    const { app } = this;
    const docs = await app.model.Player.aggregate([
      {
        $lookup: {
          from: 'games',
          localField: 'gameId',
          foreignField: '_id',
          as: 'gamesInfo',
        },
      },
      {
        $match: { openId: query.openId },
      },
    ]);
    const gamesInfo = [];
    docs.forEach(item => {
      if (item.gamesInfo && item.gamesInfo.length) {
        item.gamesInfo.forEach(ele => {
          ele.personScore = item.personScore;
        });
        gamesInfo.push(...item.gamesInfo);
      }
    });
    return gamesInfo;
  }

  // 设置职业生涯
  async setPersonalsStatis(data) {
    const { app } = this;
    const { _id } = await app.model.Player.updateOne({ _id: data._id }, {
      $set: { personScore: data.personScore },
    });
    return _id;
  }
}

module.exports = PlayerService;
