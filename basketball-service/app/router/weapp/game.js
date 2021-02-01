/*
 * @Description:
 * @Date: 2021-01-20 16:38:10
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-20 16:38:25
 * @FilePath: \basketball-service\app\router\weapp\game.js
 */
'use strict';

module.exports = app => {
  const { router, controller } = app;
  // 将要举行比赛列表
  router.get('/weapp/game/ToHeldGameList', controller.game.ToHeldGameList);
};
