'use strict';

const Controller = require('../core/base_controller');

class GameController extends Controller {
  async add() {
    const { ctx } = this;
    const requestBody = ctx.request.body;
    const _id = await ctx.service.game.addGame(requestBody);
    this.success(_id);
  }

  async update() {
    const { ctx } = this;
    const requestBody = ctx.request.body;
    const _id = await ctx.service.game.updateGame(requestBody);
    this.success(_id);
  }

  async List() {
    const { ctx } = this;
    const data = await ctx.service.game.query(ctx.query);
    this.success(data);
  }

  async ToHeldGameList() {
    const { ctx } = this;
    const data = await ctx.service.game.ToHeldGameList();
    this.success(data);
  }

  async scoreSetting() {
    const { ctx } = this;
    const data = await ctx.service.game.scoreSetting(ctx.request.body);
    this.success(data);
  }

  // 球员分组
  async buildTeam() {
    const { ctx } = this;
    const data = await ctx.service.game.buildTeam(ctx.request.body);
    this.success(data);
  }

  // 填写个人统计
  async setPersonalsStatis() {
    const { ctx } = this;
    const data = await ctx.service.player.setPersonalsStatis(ctx.request.body);
    this.success(data);
  }
}
module.exports = GameController;
