'use strict';

module.exports = app => {
  const { router, controller } = app;
  // 获取小程序码
  router.post('/weapp/expend/getWxacode', controller.expend.getWxacode);
};
