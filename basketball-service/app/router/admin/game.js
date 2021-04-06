/*
 * @Description:
 * @Date: 2021-01-20 16:31:17
 * @LastEditors: yinwb
 * @LastEditTime: 2021-04-06 17:39:48
 * @FilePath: \basketball-service\app\router\admin\game.js
 */
'use strict';


module.exports = app => {
  const { router, controller } = app;
  router.get('/api/admin/gameList', controller.game.List);
  router.get('/api/admin/gameListByAddress', controller.game.gameListByAddress);
  router.post('/api/admin/gameAdd', controller.game.add);
  router.post('/api/admin/gameUpdate', controller.game.update);
  // 比赛分数设置
  router.post('/api/admin/gameScoreSet', controller.game.scoreSetting);
  // 球员建队
  router.post('/api/admin/buildTeam', controller.game.buildTeam);
  // 设置个人比赛技术统计
  router.post('/api/admin/setPersonalsStatis', controller.game.setPersonalsStatis);
}
;
