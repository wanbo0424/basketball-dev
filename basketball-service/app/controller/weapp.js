/*
 * @Description:
 * @Date: 2021-01-13 11:23:02
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-15 16:50:37
 * @FilePath: \basketball-service\app\controller\weapp.js
 */
'use strict';

const Controller = require('../core/base_controller');

class WeappController extends Controller {
  async login() {
    const { ctx } = this;
    // 登录凭证校验
    const weappInfo =
    await ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=wx3bd5737539be2537&secret=3e9c3da492abdbad0e1cee5a310646e9&js_code=${ctx.query.code}&grant_type=authorization_code`,
      {
        dataType: 'json',
      }) || {};
    console.log('weappInfo', weappInfo.data);
    const { openid: openId, session_key } = weappInfo.data || {};

    if (openId) {
      // const result = JSON.stringify({ openId, session_key });
      this.success({ openid: openId, session_key });
    //   // 保存openId和session_key到redis
    //   await app.redis.get('default').setex(sessionid, 3600 * 24, result);
    // } else {
    //   return this.fail(ctx.ERROR_CODE, weappInfo.data.errmsg);
    }
  }
}

module.exports = WeappController;
