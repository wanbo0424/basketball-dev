/*
 * @Description:
 * @Date: 2021-05-08 10:56:08
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-05-08 11:02:10
 * @FilePath: \basketball-service\app\model\agreement.js
 */
'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const AgreementSchema = new Schema({
    nickName: {
      type: String,
    },
    isAgree: {
      type: Boolean,
    },
  }, {
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' },
  });

  return mongoose.model('Agreement', AgreementSchema);
}
;
