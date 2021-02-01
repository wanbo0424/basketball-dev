/*
 * @Description:
 * @Date: 2021-01-25 16:09:46
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-25 17:39:02
 * @FilePath: \basketball-service\app\router\weapp\gameOrder.js
 */
'use strict';


module.exports = app => {
  const { router, controller } = app;
  router.get('/weapp/personOrderList', controller.gameOrder.personOrderList);
}
;
