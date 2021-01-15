/*
 * @Description:
 * @Date: 2021-01-13 17:53:17
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-14 11:19:40
 * @FilePath: \basketball-service\app\model\playerCareer.js
 */
'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const PlayerCareerSchema = new Schema({
    // 用户唯一标识
    unionId: {
      type: String,
      unique: true,
    },
    // 生涯比赛记录ids
    gameIdList: {
      type: Array,
    },


  });

  return mongoose.model('PlayerCareer', PlayerCareerSchema);
}
;
