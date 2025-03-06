import settings from "@/config/settings";
import { RoutesDataItem } from "@/utils/routes";
import BlankLayout from '@/layouts/BlankLayout.vue';

const IndexLayoutRoutes: Array<RoutesDataItem> = [
  /*
  {
    title: 'index-layout.menu.home',
    path: '/home',
    component: ()=> import('@/views/home/index.vue')
  }, */
  {
    icon: 'home',
    title: 'index-layout.menu.home',
    path: '/home',
    redirect: settings.homeRouteItem.path,
    component: BlankLayout,
    children: [
      {
        ...settings.homeRouteItem
      },
        
    ],
  },

  {
    icon: 'datasets',
    title: 'index-layout.menu.datasets',
    path: '/datasets',
    redirect: '/datasets/nyu',
    component: BlankLayout,
    children:[
        {
            icon: 'edit',
            title: 'index-layout.menu.datasets.nyu',
            path: 'nyu',
            component: () => import('@/views/datasets/nyu/index.vue')            
        },
        {
          icon: 'set',
          title: 'index-layout.menu.datasets.kitti',
          path: 'kitti',
          component: () => import('@/views/datasets/kitti/index.vue')            
      },
    ]
  },

  {
    icon: 'online',
    title: 'index-layout.menu.online',
    path: '/online',
    component: ()=> import ('@/views/online/index.vue')
  },
 
  // {
  //   icon: 'permissions',
  //   title: 'index-layout.menu.roles',
  //   path: '/roles',
  //   redirect: '/roles/all',
  //   component: BlankLayout,
  //   children: [
  //     {
  //       icon: 'detail',
  //       title: 'index-layout.menu.roles.all',
  //       path: 'all',
  //       component: ()=> import('@/views/roles/all/index.vue'),
  //     },
  //     {
  //       icon: 'detail',
  //       roles: ['user'],
  //       title: 'index-layout.menu.roles.user',
  //       path: 'user',
  //       component: ()=> import('@/views/roles/user/index.vue'),
  //     },
  //     {
  //       icon: 'detail',
  //       roles: ['test'],
  //       title: 'index-layout.menu.roles.test',
  //       path: 'test',
  //       component: ()=> import('@/views/roles/test/index.vue'),
  //     },
  //   ],
  // },
 
];

export default IndexLayoutRoutes;