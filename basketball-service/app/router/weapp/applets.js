'use strict';

module.exports = app => {
  const { router, controller } = app;
  // 获取bannerList
  router.get('/api/weapp/applets/bannerList', controller.applets.bannerList);
};
