'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  // sequelize: {
  //   enable: true,
  //   package: 'egg-sequelize',
  // },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  oss: {
    enable: true,
    package: 'egg-oss',
  },
  // alinode: {
  //   enable: true,
  //   package: 'egg-alinode',
  // }
};
