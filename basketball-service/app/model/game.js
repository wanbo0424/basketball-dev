/*
 * @Description:
 * @Date: 2021-01-11 14:32:16
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-18 17:36:32
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
    gameDate: { type: String },
    COverage: { type: String },
    PFOverage: { type: String },
    SFOverage: { type: String },
    SGOverage: { type: String },
    PGOverage: { type: String },
    playerIds: { type: Array },
    ATeamName: { type: String },
    BTeamName: { type: String },
    ATeamPlayerIds: { type: Array },
    BTeamPlayerIds: { type: Array },
    // 0:未举行 1：正在举行 2：已举行
    gameStatus: {
      type: Number,
      default: 0,
    },
  });

  return mongoose.model('Game', GameSchema, 'games');
}
;
