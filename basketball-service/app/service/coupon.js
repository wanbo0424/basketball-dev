/*
 * @Description:
 * @Date: 2021-05-10 10:00:43
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-05-24 17:54:52
 * @FilePath: \basketball-service\app\service\coupon.js
 */
'use strict';

const Service = require('egg').Service;

class CouponService extends Service {
  async createCoupon(data) {
    const { app } = this;
    const result = await app.model.Coupon.create(data);
    return result._id;
  }

  async couponList() {
    const { app } = this;
    const result = await app.model.Coupon.find();
    return result;
  }

  // 更新用户新人券
  async updateCouponToNewplayer(out_trade_no) {
    const { app } = this;
    const trade_no_user = await app.model.Player.find({ out_trade_no });
    let users = [];
    if (trade_no_user && trade_no_user.length) {
      if (trade_no_user[0].openId) {
        users = await app.model.Player.find({ openId: trade_no_user[0].openId });
      }
    }
    if (users.length === 1) {
      // 报名过一次的用户
      const newUserCoupons = await app.model.Coupon.find({ couponType: 0 });
      if (newUserCoupons && newUserCoupons.length) {
        await app.model.Player.updateMany({ openId: trade_no_user[0].openId }, {
          $set: { couponList: newUserCoupons },
        });
      }
    } else {
      let updateCoupons = [];
      if (users[0].couponList && users[0].couponList.length) {
        updateCoupons = users[0].couponList.filter(item => item.couponType !== 0);
        await app.model.Player.updateMany({ openId: trade_no_user[0].openId }, {
          $set: { couponList: updateCoupons },
        });
      }
    }
  }
}
module.exports = CouponService
;
