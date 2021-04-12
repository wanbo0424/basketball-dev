/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1610002671985_9747';

  // add your middleware config here
  config.middleware = [ 'response', 'auth' ];
  // 小程序只能存storage，关闭csrf
  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    password: 'ywb123456',
    database: 'basketball-dev',
  };

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/admin',
      options: {
        useUnifiedTopology: true,
      },
      // mongoose global plugins, expected a function or an array of function and options
      // plugins: [ createdPlugin, [ updatedPlugin, pluginOptions ]],
    },
  };

  config.jwt = {
    secret: '123456',
    // ignore: '/weapp',
  };
  // config/config.default.js
  // config.alinode = {
  //   server: 'wss://agentserver.node.aliyun.com:8080',
  //   appid: '87570',
  //   secret: '88f179ab0c43dd547446a90f159b5a7be90efdfa',
  // };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
