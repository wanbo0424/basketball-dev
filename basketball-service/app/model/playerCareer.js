/*
 * @Description:
 * @Date: 2021-01-13 17:53:17
 * @LastEditors: yinwb
 * @LastEditTime: 2021-02-01 18:45:05
 * @FilePath: \basketball-service\app\model\playerCareer.js
 */
'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const PlayerCareerSchema = new Schema({
    // 用户唯一标识
    openId: {
      type: String,
      unique: true,
    },
    nickName: {
      type: String,
    },
    // 优惠券ID
    couponIdList: {
      type: Array,
    },
    // 参加的比赛
    gameIdList: {
      type: Array,
    },
    // 总积分
    evaluationScoreTotal: {
      type: Number,
    },
    // 总得分
    personScoreTotal: {
      type: Number,
    },

    // 速度值总得分
    speedTotal: {
      type: Number,
    },
    // 体力值总得分
    staminaTotal: {
      type: Number,
    },
    // 经验值总得分
    experienceTotal: {
      type: Number,
    },
    // 防守值总得分
    defensiveTotal: {
      type: Number,
    },

  });

  return mongoose.model('PlayerCareer', PlayerCareerSchema);
}
;
