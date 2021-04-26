/*
 * @Description:
 * @Date: 2021-04-26 10:10:18
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-04-26 17:21:13
 * @FilePath: \basketball-service\app\model\banner.js
 */
'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const BannerSchema = new Schema({
    name: {
      type: String,
    },
    banner_url: {
      type: String,
    },
    // 0关闭 1启用
    status: {
      type: Number,
    },
    toUrl: {
      type: String,
    },
  }, {
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' },
  });

  return mongoose.model('Banner', BannerSchema);
}
;
