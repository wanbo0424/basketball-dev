/*
 * @Description:
 * @Date: 2021-01-11 14:44:13
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-11 17:24:31
 * @FilePath: \basketball-service\app\schema\game.js
 */

'use strict';

module.exports = app => {
  const { STRING, UUIDV1, DATE } = app.Sequelize;

  return {
    uuid: {
      type: STRING(38),
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV1,
    },
    gameAddress: {
      type: STRING,
      allowNull: false,
    },
    gameDate: {
      type: STRING,
      allowNull: false,
    },
    COverage: {
      type: STRING,
      allowNull: false,
    },
    PFOverage: {
      type: STRING,
      allowNull: false,
    },
    SFOverage: {
      type: STRING,
      allowNull: false,
    },
    SGOverage: {
      type: STRING,
      allowNull: false,
    },
    PGOverage: {
      type: STRING,
      allowNull: false,
    },
    created_at: DATE,
    updated_at: DATE,
  };
};
