/*
 * @Description:
 * @Date: 2021-05-11 10:32:54
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-05-11 11:04:55
 * @FilePath: \basketball-service\app\router\admin\coupon.js
 */
'use strict';


module.exports = app => {
  const { router, controller } = app;
  router.post('/api/admin/createCoupon', controller.coupon.createCoupon);
  router.get('/api/admin/couponList', controller.coupon.couponList);
}
;
