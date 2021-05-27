/*
 * @Description:球员评价建议表
 * @Date: 2021-05-27 15:09:24
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-05-27 16:59:12
 * @FilePath: \basketball-service\app\model\playerSuggest.js
 */
'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const PlayerSuggestSchema = new Schema({
    // 用户唯一标识
    openId: {
      type: String,
      unique: true,
    },
    sugesstion: {
      type: String,
    },
  });

  return mongoose.model('PlayerSuggest', PlayerSuggestSchema);
};
