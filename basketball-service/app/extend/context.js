/*
 * @Description:
 * @Date: 2021-01-26 16:06:23
 * @LastEditors: yinwb
 * @LastEditTime: 2021-02-01 14:39:56
 * @FilePath: \basketball-service\app\extend\context.js
 */
'use strict';

module.exports = {
  SUCCESS_CODE: 0, // 成功
  NO_LOGIN_CODE: 100, // 未登录
  UNIQUE_CODE: 200, // 唯一性冲突
  ERROR_CODE: 500, // 失败
  // 获取token
  getAccessToken() {
    return this.cookies.get('token', { signed: false });
  },

  // 设置token
  setToken(data = {}) {
    const { app } = this;
    const { userName, _id } = data;

    const token = app.jwt.sign({ userName, id: _id }, app.config.jwt.secret, { expiresIn: '12h' });
    const cookieConfig = { maxAge: 1000 * 3600 * 24 * 7, httpOnly: false, overwrite: true, signed: false };
    this.cookies.set('token', token, { ...cookieConfig });
    this.cookies.set('userName', userName, cookieConfig);
    this.cookies.set('userId', _id, cookieConfig);
  },

  async removeToken() {
    this.cookies.set('token', null);
  },


  // 校验token
  async verifyToken() {
    const { app } = this;
    const userName = this.cookies.get('userName', { signed: false });
    const userId = this.cookies.get('userId', { signed: false });
    const token = this.getAccessToken(this);
    const verifyResult = await new Promise(resolve => {
      app.jwt.verify(token, app.config.jwt.secret, (err, decoded) => {
        if (err) {
          if (err.name === 'TokenExpiredError' && userId) {
            this.setToken({ userName, userId }); // 刷新token
            resolve({ verify: true, message: { userId } });
          } else {
            resolve({ verify: false, message: err.message });
          }
        } else {
          resolve({ verify: true, message: decoded });
        }
      });
    });

    if (!verifyResult.verify) {
      this.verifyFail(401, verifyResult.message);
      return false;
    }
    if (userId !== verifyResult.message.userUuid) {
      this.verifyFail(401, '用户 UUID 与 Token 不一致');
      return false;
    }
    this.request.body.userId = userId;
    this.request.body.userName = userName;
    // 将get请求的ctx.query合并到ctx.request.body，这里这么做是暂时的想法，我再考虑下
    this.request.body = { ...this.request.body, ...this.query };
    return true;
  },

  // 校验token失败
  verifyFail(code, message) {
    this.body = { code, message };
    this.status = code;
  },
}
;
