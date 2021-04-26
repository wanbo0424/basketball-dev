/*
 * @Description:
 * @Date: 2021-04-23 15:12:28
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-04-26 18:38:19
 * @FilePath: \basketball-service\app\controller\applets.js
 */
'use strict';
const Controller = require('../core/base_controller');
// const path = require('path');
const sendToWormhole = require('stream-wormhole');
class AppletsController extends Controller {
  async addBanner() {
    const { ctx } = this;
    const parts = ctx.multipart();
    let part;
    // parts() 返回 promise 对象
    while ((part = await parts()) !== null) {
      console.log('part', part);
      if (part && part.length) {
        // 这是 busboy 的字段
        console.log('field: ' + part[0]);
        console.log('value: ' + part[1]);
        console.log('valueTruncated: ' + part[2]);
        console.log('fieldnameTruncated: ' + part[3]);
      } else {
        if (!part || !part.filename) {
          // 这时是用户没有选择文件就点击了上传(part 是 file stream，但是 part.filename 为空)
          // 需要做出处理，例如给出错误提示消息
          return;
        }
        // part 是上传的文件流
        console.log('field: ' + part.fieldname);
        console.log('filename: ' + part.filename);
        console.log('encoding: ' + part.encoding);
        console.log('mime: ' + part.mime);
        // 文件处理，上传到云存储等等
        let result;
        try {
          result = await ctx.oss.put('applets-banner/' + part.filename, part);
        } catch (err) {
          // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
          await sendToWormhole(part);
          throw err;
        }
        let _id;
        if (result && result.res.statusCode === 200) {
          _id = await ctx.service.player.addBanner({ name: result.name, banner_url: result.url, status: 1, toUrl: '' });
          this.success(_id);
        } else {
          this.success(500, '图片上传失败');
        }
      }
    }
  }

  async bannerList() {
    const { ctx } = this;
    const docs = await ctx.service.applets.bannerList();
    // const result = await ctx.oss.list();
    // if (result.res.statusCode === 200) {
    //   this.success(result.objects);
    // } else {
    //   this.fail(500, '查询Bucket列表失败');
    // }
    this.success(docs);
  }

  async deleteBanner() {
    const { ctx } = this;
    const result = ctx.service.applets.deleteBanner(ctx.query);
    this.success(result);
    // let result;
    // try {
    //   // 填写Object完整路径。Object完整路径中不能包含Bucket名称。
    //   result = await ctx.oss.delete(ctx.query.name);
    // } catch (e) {
    //   console.log(e);
    // }
    // if (result.res.status === 204) {
    //   this.success('删除成功');
    // }
  }

  async syncBucketList() {
    const { ctx } = this;
    const result = await ctx.service.applets.syncBucketList();
    this.success(result);
  }
}
module.exports = AppletsController
;
