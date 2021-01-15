/*
 * @Description:
 * @Date: 2021-01-07 15:34:06
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-15 17:10:45
 * @FilePath: \basketball-service\app\controller\player.js
 */
'use strict';

const Controller = require('../core/base_controller');

class PlayerController extends Controller {
  // 球员报名
  async apply() {
    const { ctx } = this;
    const requestBody = ctx.request.body;
    const _id = await ctx.service.player.addPlayer(requestBody);
    this.success(_id);
  }

  // 报名列表
  async List() {
    const { ctx } = this;
    const playerData = await ctx.service.player.query(ctx.query);
    this.success(playerData);
  }

  // 根据openid分组（唯一标识）
  async playerList() {
    const { ctx } = this;
    const playerList = await ctx.service.player.playerList(ctx.query);
    this.success(playerList);
  }
}

module.exports = PlayerController;
