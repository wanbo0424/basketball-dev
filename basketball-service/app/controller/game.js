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
    const playerData = await ctx.service.game.query(ctx.query);
    this.success(playerData);
  }
}
module.exports = GameController;
