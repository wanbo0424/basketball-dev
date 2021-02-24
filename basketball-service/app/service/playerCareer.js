/*
 * @Description:
 * @Date: 2021-01-13 18:36:21
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-15 09:33:35
 * @FilePath: \basketball-service\app\service\playerCareer.js
 */
'use strict';

const Service = require('egg').Service;

class PlayerCareerService extends Service {
  // 创建球员档案（设置球员个人统计之后）
  async setCareer(data) {
    const { app } = this;
    const finders = await app.model.PlayerCareer.find({ openId: data.openId });
    let result = {};

    if (finders && finders.length) {
      const gameIdList = finders[0].gameIdList.push(data.gameId);
      result = await app.model.PlayerCareer.findOneAndUpdate({ openId: data.openId }, {
        $set: {
          personScoreTotal: data.personScore + finders[0].personScoreTotal,
          evaluationScoreTotal: data.evaluationScore + finders[0].evaluationScoreTotal,
          speedTotal: data.speedScore + finders[0].speedTotal,
          staminaTotal: data.staminaScore + finders[0].staminaTotal,
          experienceTotal: data.experienceScore + finders[0].experienceTotal,
          defensiveTotal: data.defensiveScore + finders[0].defensiveTotal,
          nickName: data.nickName,
          gameIdList,
        },
      });
    } else {
      const gameIdList = [ data.gameId ];

      const createData = {
        personScoreTotal: data.personScore,
        evaluationScoreTotal: +data.evaluationScore,
        scoreAbilityTotal: +data.scoreAbility || 0,
        speedTotal: data.speedScore || 0,
        staminaTotal: data.staminaScore || 0,
        experienceTotal: data.experienceScore || 0,
        defensiveTotal: data.defensiveScore || 0,
        couponIdList: [],
        nickName: data.nickName || '',
        openId: data.openId,
        gameIdList,
      };
      await app.model.PlayerCareer.create(createData);
    }
    return result;
  }


  async getCareerDetail(query) {
    const { app } = this;
    const result = await app.model.PlayerCareer.findOne({ openId: query.openId });
    return result;
  }
}

module.exports = PlayerCareerService;
