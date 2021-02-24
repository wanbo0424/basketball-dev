/*
 * @Description:
 * @Date: 2021-01-13 18:35:35
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-13 18:37:16
 * @FilePath: \basketball-service\app\controller\playerCareer.js
 */
'use strict';

const Controller = require('../core/base_controller');

class PlayerCareerController extends Controller {
  // 创建球员档案
  async createCareer() {
    const { ctx } = this;
    const playerData = await ctx.service.player.createCareer(ctx.request.body);
    this.success(playerData);
  }


  async getCareerDetail() {
    const { ctx } = this;
    const detail = await ctx.service.playerCareer.getCareerDetail(ctx.request.query);
    this.success(detail);
  }

}

module.exports = PlayerCareerController;
