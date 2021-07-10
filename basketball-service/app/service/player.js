/*
 * @Description:
 * @Date: 2021-01-07 15:39:52
 * @LastEditors: yinwb
 * @LastEditTime: 2021-07-09 18:13:32
 * @FilePath: \basketball-service\app\service\player.js
 */
'use strict';
const moment = require('moment');
const ObjectId = require('mongodb').ObjectId;
const Service = require('egg').Service;

class PlayerService extends Service {
  // 添加报名球员
  async addPlayer(data = {}) {
    const { app, ctx } = this;

    // const findPalyer = await app.model.Player.find({ openId: data.openId });
    // if (findPalyer && findPalyer.length) {
    //   console.log('找到这个人了', findPalyer);
    //   return app.model.Player.updateOne({ mobile: data.mobile }, { $push: { gameIdList: data.gameId } });
    // }
    // 先查询数据是否满员
    const currentGamePlayers = await app.model.Player.find({ gameId: data.gameId });
    if (currentGamePlayers.length >= 16) {
      return 1;
    }
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
      const { out_trade_no } = await app.model.Order.create(orderData);

      // todo 设置未付款提醒
      ctx.service.player.timeOrder(out_trade_no, data);
    }
    return result._id;
  }

  async timeOrder(outTradeNo, data) {
    const { app, ctx } = this;
    const time = setTimeout(async () => {
      const order = await app.model.Order.findOne({ out_trade_no: outTradeNo });
      if (order.status === 0) {
        const game = await app.model.Game.findOne({ _id: data.gameId });
        console.log(game, 'game');
        // 设置提醒
        const { data: { access_token } } = await ctx.curl('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx3bd5737539be2537&secret=8eae0891e063bca56590224254363fcc', {
          method: 'GET',
          dataType: 'json',
        });
        const result = await ctx.curl(
          `https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${access_token}`,
          {
            method: 'POST',
            // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
            contentType: 'json',
            dataType: 'json',
            data: {
              touser: data.openId,
              template_id: '8ZsOx4PKdRoVNOLhaSBG4HaIvEposPlHpc1c_BtNkDw',
              page: `/pagesA/defray/index?gameDate=${game.gameDate}&gameAddress=${game.gameAddress}&out_trade_no=${outTradeNo}&gameTimeRange=${game.gameTimeRange}&gameType=${game.gameType}&price=${game.price}`,
              data: {
                character_string6: {
                  value: outTradeNo,
                },
                thing3: {
                  value: game.gameType === 0 ? '全场5v5比赛' : '包半场活动',
                },
                amount1: { value: game.price },
                time12: { value: moment(game.gameDate).format('YYYY年MM月DD日') },
                thing7: { value: '待支付' },
              },
            },
          }) || {};
        console.log(result, '待支付微信推送result');
      } else {
        clearTimeout(time);
      }
    }, 20 * 60 * 1000);
  }

  async updatePlayer(data = {}) {
    const { app } = this;
    const { _id } = await app.model.Player.updateOne({ _id: data._id }, {
      $set: data,
    });
    return _id;
  }

  // 报名记录列表
  async query(params) {
    const { app } = this;
    for (const key in params) {
      if (!params[key]) {
        delete params[key];
      }
    }
    const query = JSON.parse(JSON.stringify(params));
    const { pageSize, current } = query;
    delete query.pageSize;
    delete query.current;
    for (const key in query) {
      if (!query[key]) {
        delete query[key];
      }
    }
    if (query.gameId) {
      query.gameId = ObjectId(query.gameId);
    }
    // const docs = await app.model.Player.find(query).skip(pageSize * (current - 1)).limit(Number(pageSize));
    const docs = await app.model.Player.aggregate([
      { $match: query },
      {
        $lookup:
        {
          from: 'games',
          localField: 'gameId',
          foreignField: '_id',
          as: 'gamesInfo',
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: [ '$gamesInfo', 0 ] }, '$$ROOT' ] },
        },
      },
      { $project: { gamesInfo: 0 } },
      { $skip: pageSize * (current - 1) },
      { $limit: Number(pageSize) },

    ]);

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
    for (const key in params) {
      if (!params[key]) {
        delete params[key];
      }
    }
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
        scoreAbility: data.scoreAbility,
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

  // 获取球员积分排名
  async getPlayerRank() {
    const { app } = this;
    // 按积分排序获取前50条
    let docs = await app.model.Player.aggregate([
      { $group:
        {
          _id: '$openId',
          evaluationScoreTotal: { $sum: '$evaluationScore' },
          personScoreTotal: { $sum: '$personScore' },
          info: { $mergeObjects: { nickName: '$nickName', role: '$role', age: '$age', avatarUrl: '$avatarUrl' } },
        },
      },
      { $sort: { evaluationScoreTotal: -1 } },
      // { $out: 'playerCareers' },
      { $limit: 50 },
    ]);
    docs = docs.filter(ele => {
      return ele.payStatus !== 0;
    }).map(item => (
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

  // 球员分组
  async groupPlayer(data) {
    const { app } = this;
    const { datas } = data;
    if (datas && datas.length) {
      datas.forEach(item => {
        (async () => {
          await app.model.Player.updateOne({ _id: item._id }, {
            $set: { team: item.team },
          });
        })();
        // if(_id) {
        // :TODO 短信通知操作
        // }
      });
    }
    // const { _id } = await app.model.Game.updateOne({ _id: data._id }, {
    //   $set: { ATeamPlayers: data.ATeamPlayers, BTeamPlayers: data.BTeamPlayers },
    // });
    return true;
  }


  // 待参赛（小程序）
  async toEnteredList(query) {
    const { app } = this;
    const docs = await app.model.Player.aggregate([
      {
        $lookup:
        {
          from: 'games',
          localField: 'gameId',
          foreignField: '_id',
          as: 'gamesInfo',
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: [ '$gamesInfo', 0 ] }, '$$ROOT' ] },
        },
      },
      { $project: { gamesInfo: 0 } },
      { $match: { openId: query.openId, gameStatus: 0, payStatus: 2 } },
    ]);
    // docs = docs.filter(item => !!item.team);
    return docs;
  }

  // 已参赛（小程序）
  async enteredList(query) {
    const { app } = this;
    const docs = await app.model.Player.aggregate([
      {
        $lookup:
        {
          from: 'games',
          localField: 'gameId',
          foreignField: '_id',
          as: 'gamesInfo',
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: [ '$gamesInfo', 0 ] }, '$$ROOT' ] },
        },
      },
      { $project: { gamesInfo: 0 } },
      { $match: { openId: query.openId, gameStatus: 2 } },
    ]);
    return docs;
  }

  /**
   * @description: 所有订单列表（小程序）
   * @param {Object} {openId, out_tarde_no}
   * @return {*}
   */
  async allOrderList(query) {
    const { app } = this;
    const docs = await app.model.Player.aggregate([
      {
        $lookup:
        {
          from: 'games',
          localField: 'gameId',
          foreignField: '_id',
          as: 'gamesInfo',
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: [ '$gamesInfo', 0 ] }, '$$ROOT' ] },
        },
      },
      { $project: { gamesInfo: 0 } },
      { $match: query },
    ]);
    return docs;
  }

  // 剩余名额
  async getCompleteQuota(query) {
    const { app } = this;
    const docs = await app.model.Player.find({ gameId: query.gameId, payStatus: 2 });
    // places = 16 - docs.length;
    return docs.length;
  }

  async getCouponList(query) {
    const { app } = this;
    const doc = await app.model.Player.findOne({ openId: query.openId });
    let coupons = [];
    if (doc) {
      coupons = doc.couponList;
    }
    return coupons;
  }
}

module.exports = PlayerService;
