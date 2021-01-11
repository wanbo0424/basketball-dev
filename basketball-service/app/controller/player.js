/*
 * @Description:
 * @Date: 2021-01-07 15:34:06
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-11 15:02:45
 * @FilePath: \basketball-service\app\controller\player.js
 */
'use strict';

const Controller = require('../core/base_controller');

class PlayerController extends Controller {
  // 球员报名
  async apply() {
    const { ctx } = this;
    const requestBody = ctx.request.body;
    const uuid = await ctx.service.player.addPlayer(requestBody);
    ctx.response.status = 200;
    const result = {
      data: uuid,
    };
    console.log(result);
    ctx.response.body = result;
  }

  async List() {
    const { ctx } = this;
    const playerData = await ctx.service.player.query(ctx.query);
    this.success(playerData);
  }
}

module.exports = PlayerController;
