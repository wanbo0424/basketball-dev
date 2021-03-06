/*
 * @Description:
 * @Date: 2021-01-20 16:38:10
 * @LastEditors: yinwb
 * @LastEditTime: 2021-06-01 11:29:23
 * @FilePath: \basketball-service\app\router\weapp\game.js
 */
'use strict';

module.exports = app => {
  const { router, controller } = app;
  // 将要举行比赛列表
  router.get('/weapp/game/ToHeldGameList', controller.game.ToHeldGameList);
  // 将要举行比赛地点列表
  router.get('/weapp/game/ToHeldGameAddresses', controller.game.ToHeldGameAddresses);
  // 查询球馆价格
  router.get('/weapp/game/queryAddressPrice', controller.game.queryAddressPrice);
};
