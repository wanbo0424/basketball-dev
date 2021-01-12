/*
 * @Description:
 * @Date: 2021-01-07 15:39:52
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-12 11:33:17
 * @FilePath: \basketball-service\app\service\player.js
 */
'use strict';

const Service = require('egg').Service;

class PlayerService extends Service {
  async addPlayer(data = {}) {
    const { app } = this;
    return await app.model.Player.create(data);
  }

  async query(params) {
    const { app } = this;
    const { pageSize, current } = params;
    return await app.model.Player.find(params).skip(pageSize * (current - 1)).limit(Number(pageSize));
  }
}

module.exports = PlayerService;
