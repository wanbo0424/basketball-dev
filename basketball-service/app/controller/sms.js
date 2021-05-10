/*
 * @Description:
 * @Date: 2021-01-22 14:20:15
 * @LastEditors: yinwb
 * @LastEditTime: 2021-05-10 09:27:07
 * @FilePath: \basketball-service\app\controller\sms.js
 */
'use strict';

const Controller = require('../core/base_controller');

class SmsController extends Controller {
  // 发送短信
  async sendSms() {
    const { ctx } = this;
    const result = await ctx.curl(
      // 'https://tcb-mxdkoyjzrwzasst5a3409-b6316d.service.tcloudbase.com/sendSms',
      'https://tcb-mxdkoyjzrwzasst5a3409-b6316d.service.tcloudbase.com/admin/sms/sendSms',
      {
        method: 'POST',
        // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
        contentType: 'json',
        dataType: 'json',
        data: ctx.request.body,
      }) || {};

    if (result.data.success) {
      ctx.service.player.updatePlayer({ _id: ctx.request.body._id, smsStatus: 1 });
    } else {
      ctx.service.player.updatePlayer({ _id: ctx.request.body._id, smsStatus: 2 });
    }
    this.success(result);
  }

  // 小程序客服推送
  async pushSms() {
    const { ctx } = this;
    const { data: { access_token } } = await ctx.curl('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx3bd5737539be2537&secret=8eae0891e063bca56590224254363fcc', {
      method: 'GET',
      dataType: 'json',
    });
    const result = await ctx.curl(
      `https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${access_token}`,
      {
        method: 'POST',
        // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
        contentType: 'json',
        dataType: 'json',
        data: ctx.request.body,
      }) || {};
    // if (result.data.success) {
    //   ctx.service.player.updatePlayer({ _id: ctx.request.body._id, smsStatus: 1 });
    // } else {
    //   ctx.service.player.updatePlayer({ _id: ctx.request.body._id, smsStatus: 2 });
    // }
    this.success(result);
  }

}
module.exports = SmsController;
