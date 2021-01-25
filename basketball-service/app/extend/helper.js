/*
 * @Description:
 * @Date: 2021-01-25 14:45:26
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-25 14:54:55
 * @FilePath: \basketball-service\app\extend\helper.js
 */
'use strict';

module.exports = {

  generateOrderNumber() {
    let num = '';
    for (let i = 0; i < 4; i++) {
      if (i === 0) {
        num += Math.floor(Math.random() * 9 + 1);
      } else {
        num += Math.floor(Math.random() * 10);
      }
    }
    const orderNum = Date.now() + '' + num;
    return orderNum;
  },
};
