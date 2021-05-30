/*
 * @Description:
 * @Date: 2021-05-27 15:33:14
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-05-27 16:53:34
 * @FilePath: \basketball-service\app\service\playerSuggest.js
 */
'use strict';

const Service = require('egg').Service;

class PlayerSuggestService extends Service {
  async syncPlayer() {
    const { app } = this;
    let playsByopenId = await app.model.Player.aggregate([
      {
        $group: {
          _id: '$openId',
        },
      },
    ]);
    playsByopenId = playsByopenId.map(item => item._id);
    const oldPlayers = await app.model.PlayerSuggest.find();
    let addPlayers = [];
    for (const e of playsByopenId) {
      if (oldPlayers.findIndex(ele => ele.openId === e) < 0) {
        addPlayers.push(e);
      }
    }
    if (addPlayers.length) {
      addPlayers = addPlayers.map(item => ({ openId: item.openId, sugesstion: '' }));
      await app.model.PlayerSuggest.insertMany(addPlayers);
    }
    return await app.model.PlayerSuggest.find();
  }

  async addPlaySuggest(data) {
    const { app } = this;
    const _id = await app.model.PlayerSuggest.create(data);
    return _id;
  }

  async updatePlaySuggest(data) {
    const { app } = this;
    const _id = await app.model.PlayerSuggest.updateOne({ _id: data._id }, {
      $set: { sugesstion: data.sugesstion },
    });
    return _id;
  }

  async getPlayerSuggests() {
    const { app } = this;
    const docs = await app.model.PlayerSuggest.find();
    return docs;
  }

  async getSuggestQuery(query) {
    const { app } = this;
    const result = await app.model.PlayerSuggest.find({ openId: query.type });
    return result;
  }
}
module.exports = PlayerSuggestService;
