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
  config.auth = {
    ignore: /^\/weapp/,
  };
  // 小程序只能存storage，关闭csrf
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // config.sequelize = {
  //   dialect: 'mysql',
  //   host: '127.0.0.1',
  //   port: 3306,
  //   password: 'ywb123456',
  //   database: 'basketball-dev',
  // };
  config.multipart = {
    mode: 'stream',
  };
  config.oss = {
    client: {
      accessKeyId: 'LTAI5tDaHc9k6WBDU4CHJJk4',
      accessKeySecret: 'bMLArCIZbRPgxH7iCBDjgDirTyLol3',
      bucket: 'apu-applets-all',
      endpoint: 'oss-cn-zhangjiakou.aliyuncs.com',
      timeout: '60s',
    },
  };

  config.mongoose = {
    client: {
      // url: 'mongodb://39.101.161.231:27017/admin',
      // url: 'mongodb://127.0.0.1:27017/admin',
      url: 'mongodb://127.0.0.1:27017/apu_202101',
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
