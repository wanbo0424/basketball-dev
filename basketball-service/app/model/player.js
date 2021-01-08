/*
 * @Description:
 * @Date: 2021-01-07 15:29:19
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-08 17:09:32
 * @FilePath: \basketball-service\app\model\player.js
 */
'use strict';

module.exports = app => {
  const { model } = app;
  const playerSchema = require('../schema/players.js')(app);
  const Player = model.define('player', playerSchema);


  /**
   * @description: // 运动员报名
   * @param {*}  attributes 球员属性
   * @return {*}
   */

  Player.apply = async ({ attributes }) => {
    console.log(attributes);
    await Player.create(attributes);
    return attributes.uuid;
  };

  Player.List = async ({ pageSize = 10, pageCurrent = 1 }) => {
    const limit = pageSize;
    const condition = {
      offset: (pageCurrent - 1) * limit,
      limit,
    };
    const { count, rows } = await Player.findAndCountAll(condition);
    console.log(count, rows);
    return { pageCurrent, count, rows };
  };

  return Player;
};
