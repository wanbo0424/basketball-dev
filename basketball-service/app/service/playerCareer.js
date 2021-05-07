/*
 * @Description:
 * @Date: 2021-01-13 18:36:21
 * @LastEditors: yinwb
 * @LastEditTime: 2021-05-07 11:27:10
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
    const { app, ctx } = this;
    let result = {};
    const mvpCount = await app.model.Player.find({ openId: query.openId, isMvp: true }).count();
    // 个人参加比赛文档
    const docs = await app.model.Player.aggregate([
      { $match: { openId: query.openId } },
      {
        $group: {
          _id: '$openId',
          totalPersonScore: { $sum: '$personScore' },
          totalEvaluationScore: { $sum: '$evaluationScore' },
          scoreAbility: { $avg: '$scoreAbility' },
          hitRateScore: { $avg: '$hitRateScore' },
          physicalScore: { $avg: '$physicalScore' },
          stableScore: { $avg: '$stableScore' },
          defensiveScore: { $avg: '$defensiveScore' },
        },
      },
    ]);
    // 排名文档
    const scoreRank = await app.model.Player.aggregate([
      {
        $group: {
          _id: '$openId',
          totalPersonScore: { $sum: '$personScore' },
          totalEvaluationScore: { $sum: '$evaluationScore' },
        },
      },
      {
        $match: {
          totalEvaluationScore: {
            $gt: docs[0].totalEvaluationScore,
          },
        },
      },
    ]);
    // 所有比赛文档
    const allDocs = await ctx.service.player.allOrderList({ openId: query.openId });
    // 胜利比赛文档
    const victoryDocs = allDocs.filter(item => {
      return ((item.team === 'A' && item.ATeamScore > item.BTeamScore) || (item.team === 'B' && item.BTeamScore > item.ATeamScore));
    });
    result = {
      mvpCount,
      ...docs[0],
      rank: scoreRank.length,
      victoryCount: victoryDocs.length,
      allCount: allDocs.length,
    };
    // const result = await app.model.Player.find({ openId: query.openId });
    // const result = await app.model.PlayerCareer.findOne({ openId: query.openId });
    return result;
  }

  async getAllCareerList() {
    const { app } = this;
    // 获取所有球员生涯数据
    const docs = await app.model.Player.aggregate([
      {
        $lookup:
        {
          from: 'games',
          localField: 'gameId',
          foreignField: '_id',
          as: 'gamesInfo',
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: [ '$gamesInfo', 0 ] }, '$$ROOT' ] },
        },
      },
      { $project: { gamesInfo: 0 } },
      {
        $group: {
          _id: '$openId',
          nickName: { $first: '$nickName' },
          avatarUrl: { $first: '$avatarUrl' },
          careerGames: {
            $push: {
              team: '$team',
              ATeamScore: '$ATeamScore',
              BTeamScore: '$BTeamScore',
              evaluationScore: '$evaluationScore',
            },
          },
        },
      },
    ]);
    return docs;
  }

}

module.exports = PlayerCareerService;
