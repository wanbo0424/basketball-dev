'use strict';

const Controller = require('../core/base_controller');

class PayController extends Controller {
  // 预支付
  async prepaid() {
    const { ctx } = this;
    const result = await ctx.curl('https://admin.xunhuweb.com/pay/mini', {
      method: 'POST',
      // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
      contentType: 'json',
      dataType: 'json',
      data: ctx.request.body,
    }) || {};
    this.success(result);
  }

  // 预支付回调
  async prepaidCb() {
    const { ctx } = this;
    console.log('支付回调', ctx.request.body);
    if (ctx.request.body.return_code === 'SUCCESS') {
      // 写入订单数据表
      await ctx.service.order.prepaidOrder(ctx.request.body);

      // 录入新用户优惠券
      await ctx.service.coupon.addCouponToNewplayer(ctx.request.body.out_trade_no);
      ctx.status = 200;
      ctx.body = 'success';
    //   this.success('_id');
    }
  }

  // 订单列表
  async getOrderList() {
    const { ctx } = this;
    const data = await ctx.service.order.getOrderList(ctx.request.query);
    this.success(data);
  }

  // 用户订单详情
  async getTrade_noDetail() {
    const { ctx } = this;
    const data = await ctx.service.order.getTrade_noDetail(ctx.request.query);
    this.success(data);
  }

  // 用户订单详情
  async getAllOrderByuser() {
    const { ctx } = this;
    const data = await ctx.service.order.getAllOrderByuser(ctx.request.query);
    this.success(data);
  }
}
module.exports = PayController
;
