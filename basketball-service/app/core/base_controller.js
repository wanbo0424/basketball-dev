/*
 * @Description:
 * @Date: 2021-01-08 16:59:55
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-08 17:01:28
 * @FilePath: \basketball-service\app\core\base_controller.js
 */
'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  get user() {
    return this.ctx.session.user;
  }

  success(data, status) {
    this.ctx.body = { code: 0, data };
    this.ctx.status = status || 200;
  }

  fail(code, message) {
    this.ctx.body = { code, message, data: {} };
    this.ctx.status = 200;
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}

module.exports = BaseController;
