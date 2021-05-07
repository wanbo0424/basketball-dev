/*
 * @Description:
 * @Date: 2021-01-20 16:31:42
 * @LastEditors: yinwb
 * @LastEditTime: 2021-05-07 11:33:12
 * @FilePath: \basketball-service\app\router\weapp\player.js
 */
'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 微信小程序
  // 球员报名
  router.post('/weapp/players/apply', controller.player.apply);
  // 创建球员生涯（预支付后创建）
  router.post('/weapp/playerCareer/createCareer', controller.playerCareer.createCareer);

  router.get('/weapp/player/getCareerList', controller.player.getCareerList);
  // 获取球员排名
  router.get('/weapp/player/getPlayerRank', controller.player.getPlayerRank);
  // 获取球员数据
  router.get('/weapp/playerCareer/getCareerDetail', controller.playerCareer.getCareerDetail);
  // 获取所有球员数据
  router.get('/weapp/playerCareer/getAllCareerList', controller.playerCareer.getAllCareerList);
}
;
