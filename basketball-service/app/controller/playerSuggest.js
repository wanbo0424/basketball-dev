/*
 * @Description:
 * @Date: 2021-05-27 15:29:55
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-05-27 16:55:17
 * @FilePath: \basketball-service\app\controller\playerSuggest.js
 */
'use strict';

const Controller = require('../core/base_controller');

class PlayerSuggestController extends Controller {
  async syncPlayer() {
    const { ctx } = this;
    const docs = await ctx.service.playerSuggest.syncPlayer();
    this.success(docs);
  }

  async updatePlaySuggest() {
    const { ctx } = this;
    const _id = await ctx.service.playerSuggest.updatePlaySuggest(ctx.request.body);
    this.success(_id);
  }

  async getPlayerSuggests() {
    const { ctx } = this;
    const docs = await ctx.service.playerSuggest.getPlayerSuggests(ctx.request.body);
    this.success(docs);
  }

  async getSuggestQuery() {
    const { ctx } = this;
    const result = await ctx.service.playerSuggest.getSuggestQuery(ctx.request.query);
    this.success(result);
  }
}
module.exports = PlayerSuggestController;
