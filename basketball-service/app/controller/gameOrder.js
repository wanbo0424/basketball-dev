/*
 * @Description:
 * @Date: 2021-01-25 15:48:19
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-25 15:59:29
 * @FilePath: \basketball-service\app\controller\gameOrder.js
 */
'use strict';

const Controller = require('../core/base_controller');

class GameOrderController extends Controller {
  async getOrderList() {
    const { ctx } = this;
    const data = await ctx.service.gameOrder.getOrderList(ctx.request.query);
    this.success(data);
  }

  async personOrderList() {
    const { ctx } = this;
    const data = await ctx.service.gameOrder.personOrderList(ctx.request.query);
    this.success(data);
  }

}
module.exports = GameOrderController
;
