/**
 * @author chuzhixin 1204505056@qq.com
 * @description vue.config.js全局配置
 */
const path = require('path')
const {
  /* baseURL, */
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  title,
  abbreviation,
  devPort,
  providePlugin,
  build7z,
  donation,
} = require('./src/config')
const { webpackBarName, webpackBanner, donationConsole } = require('vab-config')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
if (donation) donationConsole()
const { version, author } = require('./package.json')
const Webpack = require('webpack')
const WebpackBar = require('webpackbar')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const dayjs = require('dayjs')
const date = dayjs().format('YYYY_M_D')
const time = dayjs().format('YYYY-M-D HH:mm:ss')
process.env.VUE_APP_TITLE = title || 'vue-admin-beautiful'
process.env.VUE_APP_AUTHOR = author || 'chuzhixin'
process.env.VUE_APP_UPDATE_TIME = time
process.env.VUE_APP_VERSION = version

const resolve = (dir) => {
  return path.join(__dirname, dir)
}

const mockServer = () => {
  if (process.env.NODE_ENV === 'development') {
    return require('./mock/mockServer.js')
  } else {
    return ''
  }
}

module.exports = {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  devServer: {
    hot: true,
    port: devPort,
    open: true,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true,
    },
    // 注释掉的地方是前端配置代理访问后端的示例
    proxy: {
      ['/']: {
        target: `http://127.0.0.1:7001/api`,
        // target: `https://109.244.212.120`,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          ['^/']: '/',
        },
      },
    },
    after: mockServer(),
  },
  configureWebpack() {
    return {
      resolve: {
        alias: {
          '@': resolve('src'),
          '*': resolve(''),
        },
      },
      plugins: [
        new Webpack.ProvidePlugin(providePlugin),
        new WebpackBar({
          name: webpackBarName,
        }),
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false, // 删除原文件
        }),
      ],
    }
  },
  chainWebpack(config) {
    //   config.resolve.symlinks(true)
    //   config.module.rule('svg').exclude.add(resolve('src/icon/remixIcon')).end()

    //   config.module
    //     .rule('remixIcon')
    //     .test(/\.svg$/)
    //     .include.add(resolve('src/icon/remixIcon'))
    //     .end()
    //     .use('svg-sprite-loader')
    //     .loader('svg-sprite-loader')
    //     .options({ symbolId: 'remix-icon-[name]' })
    //     .end()

    //   config.when(process.env.NODE_ENV === 'development', (config) => {
    //     config.devtool('source-map')
    //   })

    // config.when(process.env.NODE_ENV !== 'development', (config) => {
    //   config.performance.set('hints', false)
    //   config.devtool('none')
    //   config.optimization.splitChunks({
    //     chunks: 'all',
    //     cacheGroups: {
    //       libs: {
    //         name: 'vue-admin-beautiful-libs',
    //         test: /[\\/]node_modules[\\/]/,
    //         priority: 10,
    //         chunks: 'initial',
    //       },
    //     },
    //   })
    //   config
    //     .plugin('banner')
    //     .use(Webpack.BannerPlugin, [`${webpackBanner}${time}`])
    //     .end()
    //   config.module
    //     .rule('images')
    //     .use('image-webpack-loader')
    //     .loader('image-webpack-loader')
    //     .options({
    //       bypassOnDebug: true,
    //     })
    //     .end()
    // })

    if (build7z) {
      config.when(process.env.NODE_ENV === 'production', (config) => {
        config
          .plugin('fileManager')
          .use(FileManagerPlugin, [
            {
              onEnd: {
                delete: [`./${outputDir}/video`, `./${outputDir}/data`],
                archive: [
                  {
                    source: `./${outputDir}`,
                    destination: `./${outputDir}/${abbreviation}_${outputDir}_${date}.7z`,
                  },
                ],
              },
            },
          ])
          .end()
      })
    }
  },
  runtimeCompiler: true,
  productionSourceMap: false,
  css: {
    requireModuleExtension: true,
    sourceMap: true,
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {
            'vab-color-blue': '#1890ff',
            'vab-margin': '20px',
            'vab-padding': '20px',
            'vab-header-height': '65px',
          },
        },
      },
    },
  },
}
