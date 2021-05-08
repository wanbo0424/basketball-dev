/*
 * @Description:
 * @Date: 2021-01-26 15:36:18
 * @LastEditors: yinwb
 * @LastEditTime: 2021-05-08 11:13:14
 * @FilePath: \basketball-service\app\controller\user\common.js
 */
'use strict';

const Controller = require('../../core/base_controller');

class UserCommonController extends Controller {
  // 登录
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

  /**
   * 注销
   */
  async logout() {
    this.ctx.removeToken();
    this.success();
  }

  // 同意用户协议
  async agreeProtocol() {
    const { ctx } = this;
    await ctx.service.user.common.agreeProtocol(ctx.request.body);
    this.success();
  }

  // 用户协议同意列表
  async agreeProtocolList() {
    const { ctx } = this;
    const result = await ctx.service.user.common.agreeProtocolList(ctx.request.body);
    this.success(result);
  }
}

module.exports = UserCommonController;
