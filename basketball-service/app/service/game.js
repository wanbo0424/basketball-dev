/*
 * @Description:
 * @Date: 2021-01-11 17:21:53
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-11 17:23:21
 * @FilePath: \basketball-service\app\service\game.js
 */
'use strict';

const Service = require('egg').Service;

class GameService extends Service {
  async addGame(data = {}) {
    const { app } = this;
    return await app.model.Game.add({ attributes: data });
  }
}

module.exports = GameService;
