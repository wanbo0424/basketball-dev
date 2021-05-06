/*
 * @Description:
 * @Date: 2021-01-20 16:31:09
 * @LastEditors: yinwb
 * @LastEditTime: 2021-05-06 10:40:31
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
  // 设置球员个人统计
  router.post('/api/admin/updatePlayer', controller.player.updatePlayer);
}
;
