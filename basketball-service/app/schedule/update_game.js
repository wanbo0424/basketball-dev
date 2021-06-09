/*
 * @Description: 自动添加场馆任务
 * @Date: 2021-06-09 15:23:52
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-06-09 15:37:09
 * @FilePath: \basketball-service\app\schedule\update_game.js
 */
'use strict';
module.exports = {
  schedule: {
    cron: '0 0 0 * * ? ',
    type: 'worker',
  },
  async task(ctx) {
    await ctx.service.game.addGameTask();
  },
};
