/*
 * @Description:
 * @Date: 2021-01-07 15:29:19
 * @LastEditors: yinwb
 * @LastEditTime: 2021-04-19 16:08:22
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
    // 昵称
    nickName: {
      type: String,
    },
    openId: {
      type: String,
    },
    avatarUrl: {
      type: String,
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
      index: true,
      // unique: false, // 值是唯一的
    },
    gameId: {
      type: Schema.Types.ObjectId,
    },
    // 优惠券
    couponIdList: {
      type: Array,
    },
    // 0未支付 1预支付 2支付完成
    payStatus: {
      type: Number,
      default: 0,
    },
    // 比赛得分
    personScore: {
      type: Number,
    },
    // 评估积分
    evaluationScore: {
      type: Number,
    },
    scoreAbility: {
      type: Number,
    },
    speedScore: {
      type: Number,
    },
    staminaScore: {
      type: Number,
    },
    experienceScore: {
      type: Number,
    },
    defensiveScore: {
      type: Number,
    },
    // 所属球队（'A', 'B')
    team: {
      type: String,
    },

  }, {
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' },
  });


  return mongoose.model('Player', PlayerSchema, 'players');
};
