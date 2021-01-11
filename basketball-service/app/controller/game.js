'use strict';

const Controller = require('../core/base_controller');

class GameController extends Controller {
  async add() {
    const { ctx } = this;
    const requestBody = ctx.request.body;
    const uuid = await ctx.service.game.addGame(requestBody);
    this.success(uuid);
  }

}
module.exports = GameController;
