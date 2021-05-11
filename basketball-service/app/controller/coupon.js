/*
 * @Description:优惠券
 * @Date: 2021-05-10 09:55:05
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-05-11 11:25:50
 * @FilePath: \basketball-service\app\controller\coupon.js
 */
'use strict';
const Controller = require('../core/base_controller');
class CouponController extends Controller {
  async createCoupon() {
    const { ctx } = this;
    const result = await ctx.service.coupon.createCoupon(ctx.request.body);
    this.success(result);
  }

  async couponList() {
    const { ctx } = this;
    const result = await ctx.service.coupon.couponList();
    this.success(result);
  }
}
module.exports = CouponController
;
