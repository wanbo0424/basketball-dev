/*
 * @Description:
 * @Date: 2021-01-07 15:39:52
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-13 18:35:22
 * @FilePath: \basketball-service\app\service\player.js
 */
'use strict';

const Service = require('egg').Service;

class PlayerService extends Service {
  // 添加报名球员
  async addPlayer(data = {}) {
    const { app } = this;
    return await app.model.Player.create(data);
  }
  // 报名球员列表
  async query(params) {
    const { app } = this;
    const { pageSize, current } = params;
    return await app.model.Player.find(params).skip(pageSize * (current - 1)).limit(Number(pageSize));
  }


}

module.exports = PlayerService;
