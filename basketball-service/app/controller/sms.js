/*
 * @Description:
 * @Date: 2021-01-22 14:20:15
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-22 14:22:38
 * @FilePath: \basketball-service\app\controller\sms.js
 */
'use strict';

const Controller = require('../core/base_controller');

class SmsController extends Controller {
  async createMessageTemplate() {
    const { ctx } = this;
    const data = await ctx.service.sms.createMessageTemplate(ctx.request.body);
    this.success(data);
  }
}
module.exports = SmsController;
