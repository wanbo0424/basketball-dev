/*
 * @Description:
 * @Date: 2021-01-07 15:34:06
 * @LastEditors: yinwb
 * @LastEditTime: 2021-04-30 18:19:34
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

  async updatePlayer() {
    const { ctx } = this;
    const requestBody = ctx.request.body;
    const _id = await ctx.service.player.updatePlayer(requestBody);
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

  // 球员个人生涯记录
  async getCareerList() {
    const { ctx } = this;
    const CareerList = await ctx.service.player.getCareerList(ctx.query);
    this.success(CareerList);
  }

  async getPlayerRank() {
    const { ctx } = this;
    const rankList = await ctx.service.player.getPlayerRank();
    this.success(rankList);
  }

  // 球员分组
  async groupPlayer() {
    const { ctx } = this;
    const data = await ctx.service.player.groupPlayer(ctx.request.body);
    this.success(data);
  }
}

module.exports = PlayerController;
