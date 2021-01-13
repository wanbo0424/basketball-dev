/*
 * @Description:
 * @Date: 2021-01-13 17:53:17
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-13 18:04:27
 * @FilePath: \basketball-service\app\model\playerCareer.js
 */
'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const PlayerCareerSchema = new Schema({
    // 用户唯一标识
    UnionID: {
      type: String,
    },
    // 生涯比赛记录[{date: '',  ATeamScore: '', BATeamScore: '', myTeam: 'A'}]
    matchRecords: {
      type: Array,
    },


  });

  return mongoose.model('PlayerCareer', PlayerCareerSchema);
}
;
