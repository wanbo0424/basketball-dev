/*
 * @Description:
 * @Date: 2021-01-25 15:48:19
 * @LastEditors: yinwb
 * @LastEditTime: 2021-04-30 09:40:04
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

  // 待参赛（小程序）
  async toEnteredList() {
    const { ctx } = this;
    const data = await ctx.service.player.toEnteredList(ctx.request.query);
    this.success(data);
  }

  // 已参赛（小程序）
  async enteredList() {
    const { ctx } = this;
    const data = await ctx.service.player.enteredList(ctx.request.query);
    this.success(data);
  }

  // 全部订单
  async allOrderList() {
    const { ctx } = this;
    const data = await ctx.service.player.allOrderList(ctx.request.query);
    this.success(data);
  }
}
module.exports = GameOrderController
;
