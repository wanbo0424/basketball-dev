/*
 * @Description:
 * @Date: 2021-05-08 10:48:19
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-05-08 11:12:47
 * @FilePath: \basketball-service\app\service\user\common.js
 */
'use strict';
const Service = require('egg').Service;

class UserCommonService extends Service {
  async agreeProtocol(data) {
    const { app } = this;
    const result = await app.model.Agreement.create(data);
    return result;
  }

  // 同意协议列表
  async agreeProtocolList() {
    const { app } = this;
    const result = await app.model.Agreement.find();
    return result;
  }
}
module.exports = UserCommonService;
