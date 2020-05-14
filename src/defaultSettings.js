module.exports = {
  language: 'zh-CN', // 表示默认的语言，暂且支持 'zh-CN' 'en-US'。在baseNavigator=true时失效
  baseNavigator: true, // true 表示用navigator.language的值作为默认语言。优先级比language高，比localStorage内的umi_locale低
  timeout: 1000 * 60, // 1分钟超时
  siderWidth: 200, // 侧边栏宽度
  fixSiderbar: true, // sticky siderbar
  delay: 300, // mock接口延迟返回的时长，单位毫秒
  breakpoint: 'xxl', // 根据视窗宽度,自动收起侧边栏的发展，还支持：xs: '480px', sm: '576px',md: '768px',lg: '992px',xl: '1200px',xxl: '1600px'
  navTheme: 'dark', // theme for nav menu
  // 注意：如果需要图标多色，Iconfont 图标项目里要进行批量去色处理
  // Usage: https://github.com/ant-design/ant-design-pro/pull/3517
  iconfontUrl: 'https://at.alicdn.com/t/font_1091403_zssgtcm62kk.js',
  firstMenu: '/dashboard', // 指定登录后的内页初始化界面
  // layout: 'sidemenu', // nav menu position: sidemenu or topmenu
  // primaryColor: '#1890ff', // primary color of ant design
  // borderRadiusBase:'2px',
  // contentWidth: 'Fluid', // layout of content: Fluid or Fixed, only works when layout is topmenu
  // fixedHeader: false, // sticky header
  // autoHideHeader: false, // auto hide header
};
