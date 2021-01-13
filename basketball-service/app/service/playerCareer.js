/*
 * @Description:
 * @Date: 2021-01-13 18:36:21
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-13 18:41:58
 * @FilePath: \basketball-service\app\service\playerCareer.js
 */
'use strict';

const Service = require('egg').Service;

class PlayerCareerService extends Service {
  // 创建球员档案（预支付后开始创建）
  async createCareer(data) {
    const { app } = this;
    const unionId = data.mobile;
    if (app.model.Player.findOne({ mobile })) {

    } else {

      return await app.model.Player.createCareer(data);
    }
  }
}

module.exports = PlayerCareerService;
