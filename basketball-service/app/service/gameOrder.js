/*
 * @Description:
 * @Date: 2021-01-25 15:54:28
 * @LastEditors: yinwb
 * @LastEditTime: 2021-04-29 15:41:35
 * @FilePath: \basketball-service\app\service\gameOrder.js
 */
'use strict';

const Service = require('egg').Service;

class GameOrderService extends Service {
  async getOrderList(params) {
    const { app } = this;
    const query = JSON.parse(JSON.stringify(params));
    const { pageSize, current } = query;
    delete query.pageSize;
    delete query.current;
    const docs = await app.model.GameOrder.find(query).skip(pageSize * (current - 1)).limit(Number(pageSize));
    // 分页信息
    const pageInfo = {
      total: await app.model.GameOrder.countDocuments(query).exec(),
      pageSize: Number(pageSize),
      current: Number(current),
    };
    return {
      docs,
      pageInfo,
    };
  }

  async personOrderList(query) {
    const { app } = this;
    const docs = await app.model.GameOrder.find(query);
    return docs;
  }

}
module.exports = GameOrderService
;
