/*
 * @Description:小程序修饰管理
 * @Date: 2021-04-23 15:09:53
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-04-25 17:55:58
 * @FilePath: \basketball-service\app\router\admin\applets.js
 */
'use strict';
module.exports = app => {
  const { router, controller } = app;
  router.post('/api/admin/applets/addBanner', controller.applets.addBanner);
  router.get('/api/admin/applets/bannerList', controller.applets.bannerList);
}
;
