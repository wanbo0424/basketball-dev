/*
 * @Description:
 * @Date: 2021-01-22 14:21:52
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-22 17:30:28
 * @FilePath: \basketball-service\app\service\sms.js
 */
'use strict';

const Service = require('egg').Service;

class SmsService extends Service {
  async createMessageTemplate(data) {
    const { ctx } = this;
    // const base64_auth_string = new Buffer('4064688eeb2c1620ac055821:2f256d534af76b8284060005').toString('base64');
    // console.log(base64_auth_string, 'base64_auth_string');
    console.log(data);
    const result = await ctx.curl('https://api.sms.jpush.cn/v1/templates', {
      method: 'POST',
      contentType: 'json',
      data,
      dataType: 'json',
      // headers: {
      auth: '4064688eeb2c1620ac055821:2f256d534af76b8284060005',
      // },
    });
    console.log(result);
    return result;
  }
}
module.exports = SmsService;
