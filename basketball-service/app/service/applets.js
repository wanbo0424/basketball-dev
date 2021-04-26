/*
 * @Description:
 * @Date: 2021-04-26 10:12:12
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-04-26 18:39:47
 * @FilePath: \basketball-service\app\service\applets.js
 */
'use strict';

const Service = require('egg').Service;

class AppletsService extends Service {
  async addBanner(data) {
    const { app } = this;
    const result = await app.model.Banner.create(data);
    return result._id;
  }

  async bannerList() {
    const { app } = this;
    const docs = await app.model.Banner.find();
    return docs;
  }

  async deleteBanner(query) {
    const { app } = this;
    const docs = await app.model.Banner.deleteOne({ _id: query._id });
    return docs;
  }

  // 同步ossBucket数据
  async syncBucketList() {
    const { ctx, app } = this;
    const bucket = await ctx.oss.list();
    let syncList = [];
    if (bucket.res.statusCode === 200) {
      syncList = bucket.objects.map(item => ({
        name: item.name,
        banner_url: item.url,
        status: 1,
        toUrl: '',
        title: '',
      }));
    } else {
      // this.fail(500, '查询Bucket列表失败');
    }

    await app.model.Banner.deleteMany();
    const result = await app.model.Banner.insertMany(syncList);
    return result;
  }
}
module.exports = AppletsService
;
