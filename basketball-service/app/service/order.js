'use strict';

const Service = require('egg').Service;

class OrderService extends Service {
    // 预支付订单
    async prepaidOrder(cbData) {
        let result = await app.model.Order.findOneAndUpdate({out_trade_no: cbData.out_trade_no}, {
            $set: cbData
        });
        return result.transaction_id;
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
}
module.exports = OrderService
;