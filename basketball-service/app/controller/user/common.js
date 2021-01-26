/*
 * @Description:
 * @Date: 2021-01-26 15:36:18
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-26 16:36:02
 * @FilePath: \basketball-service\app\controller\user\common.js
 */
'use strict';

const Controller = require('egg').Controller;

class UserCommonController extends Controller {
  async login() {
    const { ctx, app } = this;
    const { userName, password } = ctx.request.body;
    const user = await ctx.service.user.admin.getAdminByLogin(userName, password);

    if (app._.isEmpty(user)) {
      return this.fail(ctx.ERROR_CODE, '账号或密码错误');
    }

    const result = user;
    ctx.setToken(result);
    this.success(result);
  }
}

module.exports = UserCommonController;
