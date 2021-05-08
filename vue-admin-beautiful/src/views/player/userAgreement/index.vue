<!--
 * @Description: 
 * @Date: 2021-05-08 10:18:38
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-05-08 14:58:44
 * @FilePath: \vue-admin-beautiful\src\views\player\userAgreement\index.vue
-->
<template>
  <a-table
    :columns="columns"
    :loading="loading"
    :data-source="data"
    class="components-table-demo-nested"
    :pagination="false"
  ></a-table>
</template>
import
<script>
  import { ref } from 'vue'
  const columns = [
    {
      title: '微信昵称',
      dataIndex: 'nickName',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
    },
  ]
  export default {
    setup() {
      let loading = ref(false)
      let data = ref([])
      return {
        columns,
        loading,
        data,
      }
    },
  }
</script>
