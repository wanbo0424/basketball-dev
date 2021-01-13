/*
 * @Description:
 * @Date: 2021-01-11 17:21:53
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-13 16:59:04
 * @FilePath: \basketball-service\app\service\game.js
 */
'use strict';

const Service = require('egg').Service;

class GameService extends Service {
  async addGame(data = {}) {
    const { app } = this;
    const { _id } = await app.model.Game.create(data);
    return _id;
  }

  async updateGame(data = {}) {
    const { app } = this;
    console.log('data', data);
    const { _id } = await app.model.Game.findOneAndUpdate({ _id: data._id }, {
      $set: data,
    });
    return _id;
  }

  async query() {
    const { app } = this;
    // const query = JSON.parse(JSON.stringify(params));
    // const { pageSize, current } = query;
    // delete query.pageSize;
    // delete query.current;
    // const docs = await app.model.Game.find(query).skip(pageSize * (current - 1)).limit(Number(pageSize));
    // // 分页信息
    // const pageInfo = {
    //   total: await app.model.Game.countDocuments(query).exec(),
    //   pageSize: Number(pageSize),
    //   current: Number(current),
    // };
    // return {
    //   docs,
    //   pageInfo,
    // };

    return await app.model.Game.find();
  }
}

module.exports = GameService;
