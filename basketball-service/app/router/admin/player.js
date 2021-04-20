/*
 * @Description:
 * @Date: 2021-01-20 16:31:09
 * @LastEditors: yinwb
 * @LastEditTime: 2021-04-20 15:37:45
 * @FilePath: \basketball-service\app\router\admin\player.js
 */
'use strict';
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/api/admin/playerList', controller.player.List);
  router.get('/api/admin/playerGroupList', controller.player.playerList);
  // 球员分组
  router.post('/api/admin/groupPlayer', controller.player.groupPlayer);
}
;
