/*
 * @Description:
 * @Date: 2021-01-22 14:18:53
 * @LastEditors: yinwb
 * @LastEditTime: 2021-02-02 18:34:49
 * @FilePath: \basketball-service\app\router\admin\sms.js
 */
'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.post('/api/admin/sendSms', controller.sms.sendSms);
}
;
