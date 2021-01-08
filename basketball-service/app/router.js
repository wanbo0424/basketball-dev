'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 微信小程序
  router.post('/api/players/apply', controller.player.apply);


  // 管理平台
  router.post('/api/pc/playerList', controller.player.List);
};
