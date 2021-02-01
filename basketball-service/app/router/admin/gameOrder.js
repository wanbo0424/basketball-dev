/*
 * @Description:
 * @Date: 2021-01-25 16:01:48
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-25 16:03:20
 * @FilePath: \basketball-service\app\router\admin\gameOrder.js
 */
'use strict';


module.exports = app => {
  const { router, controller } = app;
  router.get('/api/admin/getOrderList', controller.gameOrder.getOrderList);
}
;
