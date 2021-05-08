'use strict';

module.exports = app => {
  const { router, controller } = app;
  // 获取bannerList
  router.get('/weapp/applets/bannerList', controller.applets.bannerList);
  // 同意协议
  router.post('/weapp/applets/agreeProtocol', controller.user.common.agreeProtocol);
};
