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
    // 优惠券
    couponList: {
      type: Array,
    },


  });

  return mongoose.model('PlayerCareer', PlayerCareerSchema);
}
;
