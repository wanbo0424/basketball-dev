/*
 * @Description:
 * @Date: 2021-01-20 16:31:09
 * @LastEditors: yinwb
 * @LastEditTime: 2021-05-27 16:32:50
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
  // 同步球员（根据openId）
  router.get('/api/admin/syncPlayer', controller.playerSuggest.syncPlayer);
  // 新增建议
  router.post('/api/admin/addPlaySuggest', controller.playerSuggest.addPlaySuggest);
  // 更新建议
  router.post('/api/admin/updatePlaySuggest', controller.playerSuggest.updatePlaySuggest);
  // 查询建议列表
  router.get('/api/admin/getPlayerSuggests', controller.playerSuggest.getPlayerSuggests);
}
;
