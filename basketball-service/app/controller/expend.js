'use strict';

const Controller = require('../core/base_controller');
const fs = require('fs');
class ExpendController extends Controller {
  async getWxacode() {
    const { ctx } = this;
    const { data: { access_token } } = await ctx.curl('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx3bd5737539be2537&secret=8eae0891e063bca56590224254363fcc', {
      method: 'GET',
      dataType: 'json',
    });
    let result = {};
    console.log(ctx.request.body, 'ctx.request.body');
    if (access_token) {
      result = await ctx.curl(`https://api.weixin.qq.com/wxa/getwxacode?access_token=${access_token}`, {
        method: 'POST',
        // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
        contentType: 'json',
        // 明确告诉 Buffer 以 JSON 格式处理返回的响应 body
        dataType: 'Buffer',
        data: ctx.request.body,
      });
      const rootPath = '/home/www_wanbo_com';
      const codePath = '/images/code.jpeg';
      console.log(result.data, 'code图片');
      // if (!fs.readFileSync(rootPath + codePath)) {
      fs.writeFileSync(rootPath + codePath, result.data, function(err) {
        if (err) { console.log(err); }
      });
      // }
      this.success(codePath);
    }

  }
}
module.exports = ExpendController
;
