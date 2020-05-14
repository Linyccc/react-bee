export default [
  {
    path: '/demo',
    name: 'demo',
    icon: 'form',
    routes: [
      // {
      //   path: '/demo/clover',
      //   name: 'clover',
      //   routes: [
      //     {
      //       path: '/demo/clover/basic',
      //       name: 'basic',
      //       component: './Demo/Clover/index',
      //     },
      //     {
      //       path: '/demo/clover/advanced',
      //       name: 'advanced',
      //       component: './Demo/Clover/advanced',
      //     },
      //   ],
      // },
      {
        path: '/demo/iframe',
        name: 'iframe',
        component: '../components/IframeWrapper/index',
        iframe: 'http://www.baidu.com',
      },
      {
        path: '/demo/upload',
        name: 'upload',
        component: './Demo/Upload/index',
      },
      // {
      //   path: '/demo/pureComponent',
      //   name: 'pureComponent',
      //   component: './Demo/PureComponent/index',
      // },
      {
        path: '/demo/scene-switch',
        name: 'sceneSwitch',
        component: './Demo/SceneSwitch/index',
      },
      // {
      //   path: '/demo/scene-switch2',
      //   name: 'sceneSwitch2',
      //   component: './Demo/SceneSwitch2/index',
      // },
      {
        path: '/demo/curd',
        component: './Demo/Curd/index',
        name: 'curd',
      },
    ],
  },
];
