/*
 * @Description:
 * @Date: 2021-05-10 10:00:43
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-05-12 17:46:16
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

  // 将新人券发放到新用户
  async addCouponToNewplayer(out_trade_no) {
    const { app } = this;
    const trade_no_user = await app.model.Player.find({ out_trade_no });
    console.log(trade_no_user, 'trade_no_user');
    let users = [];
    if (trade_no_user && trade_no_user.length) {
      if (trade_no_user[0].openId) {
        users = await app.model.Player.find({ openId: trade_no_user[0].openId });
      }
    }
    console.log(users, 'users');
    if (users.length === 1) {
      const newUserCoupons = await app.model.Coupon.find({ couponType: 0 });
      if (newUserCoupons && newUserCoupons.length) {
        await app.model.Player.updateMany({ openId: trade_no_user[0].openId }, {
          $set: { couponList: newUserCoupons },
        });
      }
    }
  }
}
module.exports = CouponService
;
