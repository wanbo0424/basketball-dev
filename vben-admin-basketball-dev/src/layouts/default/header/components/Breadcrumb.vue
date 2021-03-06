<template>
  <div :class="[prefixCls, `${prefixCls}--${theme}`]">
    <a-breadcrumb :routes="routes">
      <template #itemRender="{ route, routes, paths }">
        <Icon :icon="route.meta.icon" v-if="getShowBreadCrumbIcon && route.meta.icon" />
        <span v-if="!hasRedirect(routes, route)">
          {{ t(route.meta.title) }}
        </span>
        <router-link v-else to="" @click="handleClick(route, paths, $event)">
          {{ t(route.meta.title) }}
        </router-link>
      </template>
    </a-breadcrumb>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, toRaw, watchEffect } from 'vue';
  import { useI18n } from 'vue-i18n';

  import type { RouteLocationMatched } from 'vue-router';
  import { useRouter } from 'vue-router';
  import { filter } from '/@/utils/helper/treeHelper';
  import { REDIRECT_NAME } from '/@/router/constant';
  import Icon from '/@/components/Icon';

  import { HomeOutlined } from '@ant-design/icons-vue';
  import { PageEnum } from '/@/enums/pageEnum';

  import { useDesign } from '/@/hooks/web/useDesign';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';

  import { propTypes } from '/@/utils/propTypes';
  import { useGo } from '/@/hooks/web/usePage';
  import { isString } from '/@/utils/is';

  export default defineComponent({
    name: 'LayoutBreadcrumb',
    components: { HomeOutlined, Icon },
    props: {
      theme: propTypes.oneOf(['dark', 'light']),
    },
    setup() {
      const routes = ref<RouteLocationMatched[]>([]);
      const { currentRoute } = useRouter();
      const { prefixCls } = useDesign('layout-breadcrumb');
      const { getShowBreadCrumbIcon } = useRootSetting();

      const { t } = useI18n();
      watchEffect(() => {
        if (currentRoute.value.name === REDIRECT_NAME) return;

        const matched = currentRoute.value?.matched;
        if (!matched || matched.length === 0) return;

        let breadcrumbList = filterItem(toRaw(matched));

        const filterBreadcrumbList = breadcrumbList.filter(
          (item) => item.path !== PageEnum.BASE_HOME
        );

        if (filterBreadcrumbList.length === breadcrumbList.length) {
          filterBreadcrumbList.unshift(({
            path: PageEnum.BASE_HOME,
            meta: {
              title: t('layout.header.home'),
              isLink: true,
            },
          } as unknown) as RouteLocationMatched);
        }

        if (currentRoute.value.meta?.currentActiveMenu) {
          filterBreadcrumbList.push((currentRoute.value as unknown) as RouteLocationMatched);
        }
        // routes.value = filterBreadcrumbList.length === 1 ? [] : filterBreadcrumbList;
        routes.value = filterBreadcrumbList;
      });

      function filterItem(list: RouteLocationMatched[]) {
        let resultList = filter(list, (item) => {
          const { meta } = item;

          if (!meta) {
            return false;
          }
          const { title, hideBreadcrumb, hideMenu } = meta;
          if (!title || hideBreadcrumb || hideMenu) {
            return false;
          }

          return true;
        }).filter((item) => !item.meta?.hideBreadcrumb || !item.meta?.hideMenu);

        resultList = resultList.filter((item) => item.path !== PageEnum.BASE_HOME);
        return resultList;
      }

      function handleClick(route: RouteLocationMatched, paths: string[], e: Event) {
        e?.preventDefault();
        const {
          children,
          redirect,
          meta,
          //  components
        } = route;

        // const isParent =
        //   components?.default?.name === 'DefaultLayout' || (components?.default as any)?.parentView;

        if (
          children?.length &&
          !redirect
          // && !isParent
        ) {
          e?.stopPropagation();
          return;
        }
        if (meta?.carryParam) {
          return;
        }

        const go = useGo();
        if (redirect && isString(redirect)) {
          go(redirect);
        } else {
          const ps = paths.slice(1);
          const lastPath = ps.pop() || '';
          const parentPath = ps.pop() || '';
          let path = `${parentPath}/${lastPath}`;
          path = /^\//.test(path) ? path : `/${path}`;
          go(path);
        }
      }

      function hasRedirect(routes: RouteLocationMatched[], route: RouteLocationMatched) {
        if (route?.meta?.isLink) {
          return true;
        }

        if (routes.indexOf(route) === routes.length - 1) {
          return false;
        }
        return true;
      }

      return { routes, t, prefixCls, getShowBreadCrumbIcon, handleClick, hasRedirect };
    },
  });
</script>
<style lang="less">
  @import (reference) '../../../../design/index.less';
  @prefix-cls: ~'@{namespace}-layout-breadcrumb';

  .@{prefix-cls} {
    display: flex;
    padding: 0 8px;
    align-items: center;

    .ant-breadcrumb-link {
      .anticon {
        margin-right: 4px;
        margin-bottom: 2px;
      }
    }

    &--light {
      .ant-breadcrumb-link {
        color: @breadcrumb-item-normal-color;

        a {
          color: rgba(0, 0, 0, 0.65);

          &:hover {
            color: @primary-color;
          }
        }
      }

      .ant-breadcrumb-separator {
        color: @breadcrumb-item-normal-color;
      }
    }

    &--dark {
      .ant-breadcrumb-link {
        color: rgba(255, 255, 255, 0.6);

        a {
          color: rgba(255, 255, 255, 0.8);

          &:hover {
            color: @white;
          }
        }
      }

      .ant-breadcrumb-separator,
      .anticon {
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
</style>
