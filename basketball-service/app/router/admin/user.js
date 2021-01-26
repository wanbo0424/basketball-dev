/*
 * @Description:
 * @Date: 2021-01-26 15:34:37
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-26 15:35:59
 * @FilePath: \basketball-service\app\router\admin\user.js
 */
'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.post('/api/admin/user/login', controller.user.common.login);
}
;
