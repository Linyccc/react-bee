// https://umijs.org/config/
// import os from 'os';
import pageRoutes from './router.config';
import defaultSettings from '../src/defaultSettings';
import themeConfig from './theme/default/config';
import path from 'path';

// 执行命令 npm run build API_HOST=http://www.baidu.com时
// 执行命令 npm run dev API_HOST=http://www.baidu.com时
// process.argv[2] 都等于 'build'
const MODE = process.argv[2];
var API_HOST = '';
if (MODE == 'build' && MODE == 'dev' && process.argv[3] != undefined) {
  API_HOST = process.argv[3].toLocaleLowerCase().split('api_host=')[1];
}
// import webpackplugin from './plugin.config';
export default {
  // add for transfer to umi
  plugins: [
    [
      'umi-plugin-react',
      {
        // 这里暂时还没有添加配置，该插件还不会有作用，我们会在后面的课程按照需求打开相应的配置
        antd: true, //引入 antd 并实现按需编译
        dva: true,
        dynamicImport: {
          webpackChunkName: true,
          loadingComponent: './components/PageLoading/index',
        },
        locale: {
          enable: true, // default false
          default: defaultSettings.language, // default zh-CN
          baseNavigator: defaultSettings.baseNavigator, // default true, 为true时，用navigator.language的值作为默认语言
          antd: true, // 是否启用antd的<LocaleProvider />
        },
      },
    ],
  ],
  // theme: {
  //   // "font-size-base": "14px",
  //   'primary-color': defaultSettings.primaryColor,
  //   // "badge-font-size": "12px",
  //   // "btn-font-size-lg": "@font-size-base",
  //   // "menu-dark-submenu-bg": "#000B14",
  //   // "layout-body-background": "#f0f2f5",
  //   // "menu-dark-bg": "#1b1c21",
  //   // "layout-sider-background": "#363742",
  //   'menu-dark-item-active-bg': '#363742',
  //   'border-radius-base': defaultSettings.borderRadiusBase,
  //   'link-color': defaultSettings.primaryColor,
  //   'checkbox-color': defaultSettings.primaryColor,
  //   'btn-primary-bg': defaultSettings.primaryColor,
  // },
  treeShaking: true,
  targets: {
    ie: 9,
  },

  externals: {
    // '@antv/data-set': 'DataSet',
  },
  ignoreMomentLocale: true,
  // 不使用 url-loader 的规则（即不让小图片被转成bas64）,为了兼容ie9
  urlLoaderExcludes: [/\.(png|jpe?g|gif|svg)$/],
  chainWebpack(config, { webpack }) {
    //  svg 使用 file-loader 引入
    config.module
      .rule('svg-with-file')
      .test(/.svg$/)
      .use('svg-with-file-loader')
      .loader('file-loader')
      .options({
        name: 'svg/[name]-[hash:8].[ext]',
      });

    //  png|jpe?g|gif 使用 file-loader 引入
    config.module
      .rule('image-file')
      .test(/\.(png|jpe?g|gif)$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'images/[name]-[hash:8].[ext]',
      });

    // config.resolve.alias.set('@mock', path.resolve(process.cwd(), 'mock'));

    // config.devtool('cheap-module-source-map'); // 生成css sourcemap
  },
  lessLoaderOptions: {
    modifyVars: {
      // ...masterTheme,
      ...themeConfig,
    },
    javascriptEnabled: true,
  },
  // devtool: 'source-map',
  cssModulesExcludes: [
    path.join(__dirname, '../src/global.less'),
    path.join(__dirname, '../src/layouts/UserLayout.less'),
  ],
  // extraBabelPlugins: [
  //   [
  //     'import',
  //     {
  //       libraryName: 'antd',
  //       style:true
  //     },
  //   ],
  // ],
  base: process.env.gh ? '/react-slick/' : '/',
  publicPath: process.env.gh ? '/react-slick/' : '/',
  history: 'hash',
  hash: true,
  define: {
    API_HOST: API_HOST,
  },
  // 路由配置
  routes: pageRoutes,
};
