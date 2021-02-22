/*
 * @Description:
 * @Date: 2021-01-07 15:39:52
 * @LastEditors: yinwb
 * @LastEditTime: 2021-02-20 18:28:18
 * @FilePath: \basketball-service\app\service\player.js
 */
'use strict';

const Service = require('egg').Service;

class PlayerService extends Service {
  // 添加报名球员
  async addPlayer(data = {}) {
    const { app } = this;

    // const findPalyer = await app.model.Player.find({ openId: data.openId });
    // if (findPalyer && findPalyer.length) {
    //   console.log('找到这个人了', findPalyer);
    //   return app.model.Player.updateOne({ mobile: data.mobile }, { $push: { gameIdList: data.gameId } });
    // }

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
    if (result._id) {
      await app.model.Order.create(orderData);
    }
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

  // 设置个人统计
  async setPersonalsStatis(data) {
    const { app, ctx } = this;
    const { _id } = await app.model.Player.findOneAndUpdate({ _id: data._id }, {
      $set: {
        personScore: data.personScore,
        evaluationScore: data.evaluationScore,
        speedScore: data.speedScore,
        staminaScore: data.staminaScore,
        experienceScore: data.experienceScore,
        defensiveScore: data.defensiveScore,
      },
    });
    if (_id) {
      // 创建球员生涯
      await ctx.service.playerCareer.setCareer(data);
    }
    return _id;
  }

  // 获取球员几分排名
  async getPlayerRank() {
    const { app } = this;
    // 按积分排序获取前50条
    let docs = await app.model.Player.aggregate([
      { $group:
        {
          _id: '$openId',
          evaluationScoreTotal: { $sum: '$evaluationScore' },
          personScoreTotal: { $sum: '$personScore' },
          info: { $mergeObjects: { nickName: '$nickName', role: '$role', age: '$age' } },
        },
      },
      { $sort: { evaluationScoreTotal: -1 } },
      // { $out: 'playerCareers' },
      { $limit: 50 },
    ]);
    docs = docs.map(item => (
      {
        _id: item._id,
        evaluationScoreTotal: item.evaluationScoreTotal,
        personScoreTotal: item.personScoreTotal,
        ...item.info,
      }
    ));
    // const docs = await app.model.PlayerCareer.find();
    // console.log(docs);
    // const newDocs = docs.map(item => {
    //   return {
    //     _id: 'fdsafdfgsd',
    //     evaluationScoreTotal: item.evaluationScoreTotal,
    //     personScoreTotal: item.personScoreTotal,
    //     // ...item.info,
    //   }
    //   ;
    // });
    // console.log(newDocs);
    return docs;
  }
}

module.exports = PlayerService;
