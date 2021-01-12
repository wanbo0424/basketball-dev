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
  router.get('/api/admin/playerList', controller.player.List);
  router.post('/api/admin/gameAdd', controller.game.add);
  router.post('/api/admin/gameUpdate', controller.game.update);
  router.get('/api/admin/gameList', controller.game.List);
};
