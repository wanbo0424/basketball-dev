/*
 * @Description:
 * @Date: 2021-01-07 15:39:52
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-11 10:49:07
 * @FilePath: \basketball-service\app\service\player.js
 */
'use strict';

const Service = require('egg').Service;

class PlayerService extends Service {
  async addPlayer(data = {}) {
    const { app } = this;
    return await app.model.Player.apply({ attributes: data });
  }

  async query(params) {
    const { app } = this;
    return await app.model.Player.query({
      ...params,
    });
  }
}

module.exports = PlayerService;
