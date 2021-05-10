/*
 * @Description:优惠券
 * @Date: 2021-05-10 09:55:05
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-05-10 10:01:35
 * @FilePath: \basketball-service\app\controller\coupon.js
 */
'use strict';
const Controller = require('../core/base_controller');
class CouponController extends Controller {
  async createCoupon() {
    const { ctx } = this;
    const result = await ctx.service.coupon.createCoupon();
    this.success(result);
  }
}
module.exports = CouponController
;
