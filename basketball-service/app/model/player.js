/*
 * @Description:
 * @Date: 2021-01-07 15:29:19
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-07 17:52:53
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

  return Player;
};
