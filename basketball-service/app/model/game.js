/*
 * @Description:
 * @Date: 2021-01-11 14:32:16
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-12 11:18:16
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

  });

  return mongoose.model('Game', GameSchema, 'games');
}
;
