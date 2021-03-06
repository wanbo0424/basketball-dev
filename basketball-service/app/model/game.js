/*
 * @Description:
 * @Date: 2021-01-11 14:32:16
 * @LastEditors: yinwb
 * @LastEditTime: 2021-06-01 10:53:04
 * @FilePath: \basketball-service\app\model\game.js
 */
'use strict';

module.exports = app => {

  // const { model } = app;
  // const gameSchema = require('../schema/games.js')(app);
  // const Game = model.define('game', gameSchema);

  // Game.add = async ({ attributes }) => {
  //   console.log(attributes);
  //   await Game.create(attributes);
  //   return attributes.uuid;
  // };

  // Game.query = async ({ pageSize = 10, pageCurrent = 1 }) => {
  //   const limit = pageSize;
  //   const condition = {
  //     offset: (pageCurrent - 1) * limit,
  //     limit,
  //   };
  //   const { count, rows } = await Game.findAndCountAll(condition);
  //   console.log(count, rows);
  //   return { pageCurrent, count, rows };
  // };

  // return Game;


  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const GameSchema = new Schema({
    gameAddress: { type: String },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    // 具体位置
    specificLocation: {
      type: String,
    },
    gameDate: { type: String },
    gameTimeRange: { type: String },
    COverage: {
      type: String,
    },
    PFOverage: {
      type: String,
    },
    SFOverage: {
      type: String,
    },
    SGOverage: {
      type: String,
    },
    PGOverage: {
      type: String,
    },
    playerIds: { type: Array },
    ATeamName: { type: String },
    BTeamName: { type: String },
    ATeamScore: { type: Number },
    BTeamScore: { type: Number },
    // ATeamPlayers: { type: Array },
    // BTeamPlayers: { type: Array },
    // 0:未举行 1：正在举行 2：已举行  3：未开放
    gameStatus: {
      type: Number,
      default: 0,
    },
    // 球衣颜色
    AjerseyColor: {
      type: String,
    },
    // 价格
    price: {
      type: Number,
    },
    // 比赛类型 0：全场 1：半场
    gameType: {
      type: Number,
    },
  }, {
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' },
  });

  return mongoose.model('Game', GameSchema, 'games');
}
;
