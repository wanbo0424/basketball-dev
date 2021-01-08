/*
 * @Description:
 * @Date: 2021-01-08 10:47:09
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-08 14:10:36
 * @FilePath: \vben-admin-basketball-dev\src\router\routes\modules\player.ts
 */
import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const player: AppRouteModule = {
  path: '/player',
  name: 'Player',
  component: LAYOUT,
  meta: {
    icon: 'bx:bx-home',
    title: '球员管理',
  },
  children: [
    {
      path: 'apply',
      name: 'Apply',
      component: () => import('/@/views/player/apply/index.vue'),
      meta: {
        title: '报名球员',
        affix: true,
        icon: 'bx:bx-home',
      },
    },
    {
      path: 'apply',
      name: 'Apply',
      component: () => import('/@/views/player/apply/index.vue'),
      meta: {
        title: '报名球员2',
        affix: true,
        icon: 'bx:bx-home',
      },
    },
  ],
};
export default player;
