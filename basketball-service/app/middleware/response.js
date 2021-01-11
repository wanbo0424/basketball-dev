/*
 * @Description:
 * @Date: 2021-01-11 10:15:08
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-11 18:34:22
 * @FilePath: \basketball-service\app\middleware\response.js
 */
'use strict';

module.exports = () => {
  return async function(ctx, next) {
    // 开发环境跨域
    ctx.response.set('Access-Control-Allow-Origin', '*');
    await next();
  };
};
