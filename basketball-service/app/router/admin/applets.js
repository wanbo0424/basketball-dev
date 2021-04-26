/*
 * @Description:小程序修饰管理
 * @Date: 2021-04-23 15:09:53
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-04-26 18:38:11
 * @FilePath: \basketball-service\app\router\admin\applets.js
 */
'use strict';
module.exports = app => {
  const { router, controller } = app;
  router.post('/api/admin/applets/addBanner', controller.applets.addBanner);
  router.get('/api/admin/applets/bannerList', controller.applets.bannerList);
  router.delete('/api/admin/applets/deleteBanner', controller.applets.deleteBanner);
  router.get('/api/admin/applets/syncBucketList', controller.applets.syncBucketList);
}
;
