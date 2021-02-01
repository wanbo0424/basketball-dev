/*
 * @Description:
 * @Date: 2021-01-29 15:27:17
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-29 15:30:45
 * @FilePath: \basketball-service\app\middleware\auth.js
 */
'use strict';

module.exports = () => {
  return async function auth(ctx, next) {
    const ignorePaths = [ '/api/admin/user/login' ];
    const valid = await ctx.verifyToken();
    if (valid || ignorePaths.includes(ctx.path)) {
      await next();
    }
  };
}
;
