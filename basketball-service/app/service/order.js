'use strict';

const Service = require('egg').Service;

class OrderService extends Service {
    // 预支付订单
    async prepaidOrder(cbData) {
      const { app } = this;
        let prepaidFree = 1
        let updateData = cbData
        if(updateData.total_fee === prepaidFree && updateData.status === 'complete') {
          updateData.status = 1
        }
        let result = await app.model.Order.updateOne({out_trade_no: updateData.out_trade_no}, {
            $set: updateData  
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
        let detail = await app.model.Order.findOne({out_trade_no: params.out_trade_no});
        return detail
      }
}
module.exports = OrderService
;