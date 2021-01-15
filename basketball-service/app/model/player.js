/*
 * @Description:
 * @Date: 2021-01-07 15:29:19
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-15 17:57:54
 * @FilePath: \basketball-service\app\model\player.js
 */
'use strict';

module.exports = app => {
  // const { model } = app;
  // const playerSchema = require('../schema/players.js')(app);
  // const Player = model.define('player', playerSchema);


  // /**
  //  * @description: // 运动员报名
  //  * @param {*}  attributes 球员属性
  //  * @return {*}
  //  */

  // Player.apply = async ({ attributes }) => {
  //   console.log(attributes);
  //   await Player.create(attributes);
  //   return attributes.uuid;
  // };


  // /**
  //  * @description: // 运动员列表
  //  * @param {*}  查询条件
  //  * @return {*}
  //  */
  // Player.query = async ({ pageSize = 10, current = 1 }) => {
  //   const limit = Number(pageSize);
  //   const condition = {
  //     offset: (Number(current) - 1) * limit,
  //     limit,
  //   };
  //   const { count, rows } = await Player.findAndCountAll(condition);
  //   return { current: Number(current), count: Number(count), rows };
  // };

  // return Player;

  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const PlayerSchema = new Schema({
    openId: {
      type: String,
      default: '2',
    },
    sex: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      index: true,
      // unique: true, // 值是唯一的
    },
    gameId: {
      type: String,
    },
    // gameIdList: {
    //   type: Array,
    // },

  });

  return mongoose.model('Player', PlayerSchema, 'players');
};
