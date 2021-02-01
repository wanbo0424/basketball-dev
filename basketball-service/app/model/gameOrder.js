/*
 * @Description:订单
 * @Date: 2021-01-25 14:29:24
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-25 18:38:30
 * @FilePath: \basketball-service\app\model\gameOrder.js
 */
'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const GameOrderSchema = new Schema(
    {
      orderId: {
        type: String,
      },
      openId: {
        type: String,
      },
      creatorName: {
        type: String,
      },
      // 0 未支付  1完成预支付  2完成尾款
      status: {
        type: Number,
      },
    },
    {
      versionKey: false,
      timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' },
    });

  return mongoose.model('GameOrder', GameOrderSchema);
}
;
