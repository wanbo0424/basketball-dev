import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true,
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/403'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    meta: {
      title: '首页',
      icon: 'home-4-line',
      affix: true,
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index'),
        meta: {
          title: '首页',
          icon: 'home-4-line',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/player',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '球员管理',
      icon: 'team-fill',
    },
    children: [
      {
        path: 'apply',
        name: 'Apply',
        component: () => import('@/views/player/apply'),
        meta: {
          title: '报名球员记录',
          icon: 'unordered-list',
        },
      },
      {
        path: 'career',
        name: 'Career',
        component: () => import('@/views/player/career'),
        meta: {
          title: '球员生涯',
          icon: 'solution',
        },
      },
      {
        path: 'userAgreement',
        name: 'UserAgreement',
        component: () => import('@/views/player/userAgreement'),
        meta: {
          title: '同意用户协议列表',
          icon: 'book-open-line',
        },
      },
    ],
  },
  {
    path: '/game',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '比赛管理',
      icon: 'basketball-fill',
    },
    children: [
      {
        path: 'message',
        name: 'Message',
        component: () => import('@/views/game/message'),
        meta: {
          title: '比赛信息',
          icon: 'profile',
        },
      },
      {
        path: 'gameSetting',
        name: 'GameSetting',
        component: () => import('@/views/game/gameSetting'),
        meta: {
          title: '比赛设置',
          icon: 'profile',
        },
      },
    ],
  },
  {
    path: '/sms',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '活动管理',
      icon: 'apps-line',
    },
    children: [
      {
        path: 'SMSTemplate',
        name: 'SMSTemplate',
        component: () => import('@/views/activity/SMSTemplate'),
        meta: {
          title: '发送短信',
          icon: 'table-2',
        },
      },
      {
        path: 'gameOrder',
        name: 'GameOrder',
        component: () => import('@/views/activity/gameOrder'),
        meta: {
          title: '订单',
          icon: 'table-2',
        },
      },
      {
        path: 'coupon',
        name: 'Coupon',
        component: () => import('@/views/activity/coupon'),
        meta: {
          title: '优惠券',
          icon: 'coupon-line',
        },
      },
    ],
  },
  {
    path: '/appletManage',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '小程序管理',
      icon: 'wechat-fill',
    },
    children: [
      {
        path: 'bannerManage',
        name: 'BannerManage',
        component: () => import('@/views/appletManage/bannerManage'),
        meta: {
          title: 'banner管理',
          icon: 'image-2-line',
        },
      },
    ],
  },
  // {
  //   path: '/vab',
  //   component: Layout,
  //   redirect: '/vab/table',
  //   alwaysShow: true,
  //   meta: {
  //     title: '组件',
  //     icon: 'apps-line',
  //   },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/vab/table'),
  //       meta: {
  //         title: '表格',
  //         icon: 'table-2',
  //       },
  //     },
  //     {
  //       path: 'icon',
  //       name: 'Icon',
  //       component: () => import('@/views/vab/icon'),
  //       meta: {
  //         title: '图标',
  //         icon: 'remixicon-line',
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/test',
  //   component: Layout,
  //   redirect: '/test/test',
  //   meta: {
  //     title: '动态路由测试',
  //     icon: 'test-tube-line',
  //   },
  //   children: [
  //     {
  //       path: 'test',
  //       name: 'Test',
  //       component: () => import('@/views/test'),
  //       meta: {
  //         title: '动态路由测试',
  //         icon: 'test-tube-line',
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/error',
  //   name: 'Error',
  //   component: Layout,
  //   redirect: '/error/403',
  //   meta: {
  //     title: '错误页',
  //     icon: 'error-warning-line',
  //   },
  //   children: [
  //     {
  //       path: '403',
  //       name: 'Error403',
  //       component: () => import('@/views/403'),
  //       meta: {
  //         title: '403',
  //         icon: 'error-warning-line',
  //       },
  //     },
  //     {
  //       path: '404',
  //       name: 'Error404',
  //       component: () => import('@/views/404'),
  //       meta: {
  //         title: '404',
  //         icon: 'error-warning-line',
  //       },
  //     },
  //   ],
  // },
  {
    path: '/*',
    redirect: '/404',
    hidden: true,
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...constantRoutes, ...asyncRoutes],
})

export default router
