'use strict';

const Controller = require('../core/base_controller');

class GameController extends Controller {
  async add() {
    const { ctx } = this;
    const requestBody = ctx.request.body;
    // const _id = await ctx.service.game.addGame(requestBody);
    await ctx.service.game.addGame(requestBody);
    this.success();
  }

  async update() {
    const { ctx } = this;
    const requestBody = ctx.request.body;
    const _id = await ctx.service.game.updateGame(requestBody);
    this.success(_id);
  }

  async batchUpdateGame() {
    const { ctx } = this;
    const requestBody = ctx.request.body;
    await ctx.service.game.batchUpdateGame(requestBody);
    this.success();
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

  async ToHeldGameAddresses() {
    const { ctx } = this;
    const data = await ctx.service.game.ToHeldGameAddresses();
    this.success(data);
  }

  async scoreSetting() {
    const { ctx } = this;
    const data = await ctx.service.game.scoreSetting(ctx.request.body);
    this.success(data);
  }


  // 球员组队
  async buildTeam() {
    const { ctx } = this;
    const data = await ctx.service.game.buildTeam(ctx.request.body);
    this.success(data);
  }

  // 设置个人统计
  async setPersonalsStatis() {
    const { ctx } = this;
    const data = await ctx.service.player.setPersonalsStatis(ctx.request.body);
    this.success(data);
  }


  // 按照比赛地点分组查询
  async gameListByAddress() {
    const { ctx } = this;
    const data = await ctx.service.game.gameListByAddress(ctx.query);
    this.success(data);
  }

  // 获取球馆价格列表
  async syncAddressList() {
    const { ctx } = this;
    const data = await ctx.service.game.syncAddressList(ctx.query);
    this.success(data);
  }
  async getAddressPriceList() {
    const { ctx } = this;
    const data = await ctx.service.game.getAddressPriceList(ctx.query);
    this.success(data);
  }
  async setAddressPrice() {
    const { ctx } = this;
    const data = await ctx.service.game.setAddressPrice(ctx.request.body);
    this.success(data);
  }
  async queryAddressPrice() {
    const { ctx } = this;
    const data = await ctx.service.game.queryAddressPrice(ctx.query);
    this.success(data[0]);
  }
}
module.exports = GameController;
