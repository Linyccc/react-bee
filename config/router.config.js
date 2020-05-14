import demo from './router.demo.config';
import ui from './router.ui.config';
import prod from './router.prod.config';

export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      // { path: "/user/register", component: "./User/Register" },
      // {
      //     path: "/user/register-result",
      //     component: "./User/RegisterResult"
      // }
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user', 'test'],
    routes: [
      { path: '/', redirect: '/welcome' },
      {
        path: '/welcome',
        name: 'welcome',
        hideInMenu: true,
        component: './Welcome/index',
      },
      ...prod,
      ...ui,
      // ...demo,
    ],
  },
];
