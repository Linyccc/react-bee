export default [
  {
    path: '/form',
    name: 'form',
    icon: 'form',
    routes: [
      {
        path: '/form/inputs',
        component: './UI/Form/Inputs',
        name: 'inputs',
      },
      {
        path: '/form/basic-form',
        component: './UI/Form/BasicForm',
        name: 'basicform',
      },
      {
        path: '/form/step-form',
        component: './UI/Form/StepForm/index',
        name: 'stepform',
      },
      {
        path: '/form/advanced-form',
        component: './UI/Form/AdvancedForm',
        name: 'advancedform',
      },
    ],
  },
  {
    path: '/tables',
    name: 'tables',
    icon: 'heat-map',
    routes: [
      // {
      //   path: '/tables/advanced-search-table',
      //   name: 'advancedSearchTable',
      //   component: './UI/Tables/advancedSearchTable',
      // },
      {
        path: '/tables/curd',
        component: './Demo/Curd/index',
        name: 'advancedSearchTable',
      },
      {
        path: '/tables/style',
        component: './UI/Tables/index',
        name: 'style',
      },
    ],
  },
  {
    path: '/cards',
    name: 'cards',
    icon: 'book',
    component: './UI/Cards/index',
  },
  {
    path: '/tabs',
    name: 'tabs',
    icon: 'book',
    component: './UI/Tabs/index',
  },
  {
    path: '/profile',
    name: 'profile',
    icon: 'area-chart',
    routes: [
      {
        path: '/profile/basic',
        name: 'basic',
        component: './UI/Profile/basicProfile',
      },
      {
        path: '/profile/advanced',
        name: 'advanced',
        component: './UI/Profile/advancedProfile',
      },
    ],
  },
  {
    path: '/charts',
    name: 'charts',
    icon: 'area-chart',
    component: './UI/Charts/index',
  },
  {
    path: '/dropdown',
    name: 'dropdown',
    icon: 'coffee',
    component: './UI/Dropdown/index',
  },
  {
    path: '/modal',
    name: 'modal',
    icon: 'experiment',
    component: './UI/Modal/index',
  },
  {
    path: '/pop',
    name: 'pop',
    icon: 'fire',
    component: './UI/Pop/index',
  },
  // {
  //   path: '/list',
  //   icon: 'table',
  //   name: 'list',
  //   routes: [
  //     {
  //       path: '/list/basic-list',
  //       name: 'basiclist',
  //       component: './UI/List/BasicList',
  //     },
  //     {
  //       path: '/list/card-list',
  //       name: 'cardlist',
  //       component: './UI/List/CardList',
  //     },
  //     {
  //       path: '/list/search',
  //       name: 'searchlist',
  //       component: './UI/List/List',
  //       routes: [
  //         {
  //           path: '/list/search',
  //           redirect: '/list/search/articles',
  //         },
  //         {
  //           path: '/list/search/articles',
  //           name: 'articles',
  //           component: './UI/List/Articles',
  //         },
  //         {
  //           path: '/list/search/projects',
  //           name: 'projects',
  //           component: './UI/List/Projects',
  //         },
  //         {
  //           path: '/list/search/applications',
  //           name: 'applications',
  //           component: './UI/List/Applications',
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    path: '/other',
    name: 'other',
    icon: 'deployment-unit',
    component: './UI/Other/Index',
  },
  {
    path: '/graph',
    name: 'graph',
    icon: 'share-alt',
    component: './UI/Graph/Index',
  },
  {
    name: 'editor',
    icon: 'highlight',
    path: '/editor',
    routes: [
      {
        path: '/editor/flow',
        name: 'flow',
        component: './UI/Editor/GGEditor/Flow',
      },
      {
        path: '/editor/mind',
        name: 'mind',
        component: './UI/Editor/GGEditor/Mind',
      },
      {
        path: '/editor/koni',
        name: 'koni',
        component: './UI/Editor/GGEditor/Koni',
      },
    ],
  },
];
