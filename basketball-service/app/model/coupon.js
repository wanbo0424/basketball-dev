/*
 * @Description:优惠券基础信息
 * @Date: 2021-01-25 10:34:56
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-25 10:38:56
 * @FilePath: \basketball-service\app\model\coupon.js
 */
'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const CouponSchema = new Schema({
    name: {
      type: String,
    },
    money: {
      type: Number,
    },
    status: {
      type: Number,
    },
  }, {
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' },
  });

  return mongoose.model('Coupon', CouponSchema);
}
;
