/*
 * @Description:优惠券基础信息
 * @Date: 2021-01-25 10:34:56
 * @LastEditors: yinwb
 * @LastEditTime: 2021-02-19 15:30:19
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
    // 折扣、津贴
    allowance: {
      type: Number,
    },
    // 0 新人折扣劵  1现金券
    couponType: {
      type: Number,
    },
    // 0未使用   1已使用
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
