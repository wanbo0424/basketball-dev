/*
 * @Description:
 * @Date: 2021-01-22 14:21:52
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-25 09:51:40
 * @FilePath: \basketball-service\app\service\sms.js
 */
'use strict';

const Service = require('egg').Service;

class SmsService extends Service {
  async createMessageTemplate(data) {
    const { ctx } = this;
    const result = await ctx.curl('https://api.sms.jpush.cn/v1/templates', {
      method: 'POST',
      contentType: 'json',
      data,
      dataType: 'json',
      auth: '4064688eeb2c1620ac055821:2f256d534af76b8284060005',
    });
    return result;
  }

}
module.exports = SmsService;
