'use strict';

const Service = require('egg').Service;

class OrderService extends Service {
  // 预支付订单
  async prepaidOrder(cbData) {
    const { app } = this;
    const prepaidFree = 1;
    const updateData = cbData;
    if (updateData.total_fee === prepaidFree && updateData.status === 'complete') {
      updateData.status = 1;
    }
    const result = await app.model.Order.updateOne({ out_trade_no: updateData.out_trade_no }, {
      $set: updateData,
    });
    return result;
  }

  // 获取订单列表
  async getOrderList(params) {
    const { app } = this;
    const query = JSON.parse(JSON.stringify(params));
    const { pageSize, current } = query;
    delete query.pageSize;
    delete query.current;
    const docs = await app.model.Order.find(query).skip(pageSize * (current - 1)).limit(Number(pageSize));
    // 分页信息
    const pageInfo = {
      total: await app.model.Order.countDocuments(query).exec(),
      pageSize: Number(pageSize),
      current: Number(current),
    };
    return {
      docs,
      pageInfo,
    };
  }

  // 根据客户端生成订单号查询订单
  async getTrade_noDetail(params) {
    const { app } = this;
    const detail = await app.model.Order.findOne({ out_trade_no: params.out_trade_no });
    return detail;
  }

  // 根据用户openId查询订单列表
  async getAllOrderByuser(params) {
    const { app } = this;
    // const orderList = await app.model.Order.find({ openId: params.openId });
    const list = await app.model.Order.aggregate([
      {
        $lookup: {
          from: 'games',
          localField: 'gameId',
          foreignField: '_id',
          as: 'gamesInfo',
        },
      },
      {
        $match: { openId: params.openId },
      },
    ]);
    if (list && list.length) {
      list.forEach(item => {
        if (item.gamesInfo && item.gamesInfo.length) {
          item.gamesInfo.forEach(ele => {
            item.gameAddress = ele.gameAddress;
            item.gameDate = ele.gameDate;
          });
        }
      });
    }
    // const list = await app.model.Order.find({ openId: params.openId });
    // if (list && list.length) {
    //   list.forEach(item => {
    //     if (item.gameId) {
    //       (async () => {
    //         const game = await app.model.Game.findOne({ _id: item.gameId });
    //         console.log('game', game);
    //         // item.gameAddress = game.gameAddress;
    //         // item.gameDate = game.gameDate;
    //       })();
    //     }
    //   });
    // }
    return list;
  }
}
module.exports = OrderService
;
