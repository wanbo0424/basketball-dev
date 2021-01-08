<!--
 * @Description: 
 * @Date: 2021-01-08 17:59:51
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-08 18:40:27
 * @FilePath: \vue-admin-beautiful\src\views\player\apply\index.vue
-->
<template>
  <a-table
    :columns="columns"
    :row-key="(record) => record.uuid"
    :data-source="data"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  ></a-table>
</template>
<script>
  const columns = [
    {
      title: '性别',
      dataIndex: 'sex',
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: '角色',
      dataIndex: 'role',
    },
    {
      title: '联系方式',
      dataIndex: 'role',
    },
  ]
  export default {
    setup() {
      return {
        columns,
      }
    },
  }
</script>
