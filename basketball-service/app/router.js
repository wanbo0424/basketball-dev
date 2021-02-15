'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  require('./router/weapp/game.js')(app);
  require('./router/weapp/player.js')(app);
  require('./router/weapp/gameOrder.js')(app);
  require('./router/weapp/pay.js')(app);


  require('./router/admin/player.js')(app);
  require('./router/admin/game.js')(app);
  require('./router/admin/sms.js')(app);
  require('./router/admin/gameOrder.js')(app);
  require('./router/admin/user.js')(app);
  // router.get('/', controller.home.index);
  // // 微信小程序
  // router.post('/weapp/players/apply', controller.player.apply);
  // // 创建球员生涯（预支付后创建）
  // router.post('/weapp/playerCareer/createCareer', controller.playerCareer.createCareer);
  // // 将要举行比赛列表
  // router.get('/weapp/game/ToHeldGameList', controller.game.ToHeldGameList);
  // // 球员个人生涯记录
  // router.get('/weapp/player/getCareerList', controller.player.getCareerList);
  router.get('/weapp/login', controller.weapp.login);


  // 管理平台
  // router.get('/api/admin/playerList', controller.player.List);
  // router.get('/api/admin/playerGroupList', controller.player.playerList);
  // router.post('/api/admin/gameAdd', controller.game.add);
  // router.post('/api/admin/gameUpdate', controller.game.update);
  // // 比赛分数设置
  // router.post('/api/admin/gameScoreSet', controller.game.scoreSetting);
  // // 球员分组
  // router.post('/api/admin/buildTeam', controller.game.buildTeam);
  // router.get('/api/admin/gameList', controller.game.List);
};
