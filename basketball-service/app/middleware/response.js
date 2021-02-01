/*
 * @Description:
 * @Date: 2021-01-11 10:15:08
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-26 15:28:05
 * @FilePath: \basketball-service\app\middleware\response.js
 */
'use strict';

module.exports = () => {
  return async function(ctx, next) {
    // 开发环境跨域
    ctx.response.set('Access-Control-Allow-Origin', '*');
    // ctx.cookies.set('_wanbo', '19960424', {
    //   httpOnly: true, // 默认就是 true
    //   encrypt: true, // 加密传输
    // });
    await next();
  };
};
