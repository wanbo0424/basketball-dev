'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const OrderSchema = new Schema({
    //   平台返回订单号
    order_id: {
      type: String,
    },
    // 微信支付宝等第三方平台交易号
    transaction_id: {
      type: String,
    },
    // 微信用户openId
    openId: {
      type: String,
    },
    // 用户端自主生成的订单号
    out_trade_no: {
      type: String,
    },
    total_fee: {
      type: Number,
    },
    time_end: {
      type: String,
    },
    gameId: {
      type: Schema.Types.ObjectId,
    },
    // 0未支付 1预支付 2已支付尾款
    status: {
      type: Number,
    },
  }, {
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' },
  });

  return mongoose.model('Order', OrderSchema);
}
;
