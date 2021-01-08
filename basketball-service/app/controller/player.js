/*
 * @Description:
 * @Date: 2021-01-07 15:34:06
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-07 17:58:09
 * @FilePath: \basketball-service\app\controller\player.js
 */
'use strict';

const Controller = require('egg').Controller;

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
}

module.exports = PlayerController;
