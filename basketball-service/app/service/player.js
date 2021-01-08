/*
 * @Description:
 * @Date: 2021-01-07 15:39:52
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-07 17:11:40
 * @FilePath: \basketball-service\app\service\player.js
 */
'use strict';

const Service = require('egg').Service;

class PlayerService extends Service {
  async addPlayer(data = {}) {
    const { app } = this;
    return await app.model.Player.apply({ attributes: data });
  }
}

module.exports = PlayerService;
