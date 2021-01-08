/*
 * @Description: 运动员属性
 * @Date: 2021-01-07 15:20:18
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-07 17:36:11
 * @FilePath: \basketball-service\app\schema\player.js
 */

'use strict';

module.exports = app => {
  const { STRING, UUIDV1, INTEGER, BIGINT, DATE } = app.Sequelize;

  return {
    uuid: {
      type: STRING(38),
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV1,
    },
    sex: {
      type: STRING,
      allowNull: false,
    },
    age: {
      type: INTEGER,
      allowNull: false,
    },
    role: {
      type: STRING,
      allowNull: false,
    },
    mobile: {
      type: BIGINT,
      allowNull: false,
    },
    created_at: {
      type: DATE,
    },
    updated_at: DATE,
  };
};
