<!--
 * @Description: 
 * @Date: 2021-04-21 16:02:52
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-04-23 14:45:58
 * @FilePath: \vue-admin-beautiful\src\views\appletManage\bannerManage\index.vue
-->
<template>
  <a-button type="primary" @click="add">添加</a-button>
  <a-table
    :columns="columns"
    :data-source="data"
    class="components-table-demo-nested"
    :pagination="false"
  ></a-table>

  <add-banner ref="bannerRef"></add-banner>
</template>
<script>
  import AddBanner from './add-banner'
  import { ref } from 'vue'
  const columns = [{ title: 'banner图', dataIndex: 'banner_url' }]
  export default {
    components: { AddBanner },
    setup() {
      let bannerRef = ref(null)
      const add = () => {
        bannerRef.value.init()
      }
      return {
        columns,
        add,
        bannerRef,
      }
    },
  }
</script>
