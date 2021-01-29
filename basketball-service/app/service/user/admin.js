/*
 * @Description:
 * @Date: 2021-01-26 15:48:14
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-29 17:28:00
 * @FilePath: \basketball-service\app\service\user\admin.js
 */
'use strict';
// const md5 = require('md5');
const Service = require('egg').Service;

class AdminService extends Service {
  /**
   * 查找某个管理员数据
   * @param {string} userName - 管理员账号
   * @param {string} password - 管理员密码
   * @return {object|null} - 查找结果
   */
  async getAdminByLogin(userName, password) {
    return await this.app.model.Admin.findOne({ userName, password });
  }
}

module.exports = AdminService;
