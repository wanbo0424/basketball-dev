<!--
 * @Description: 
 * @Date: 2021-01-22 11:02:39
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-22 14:33:59
 * @FilePath: \vue-admin-beautiful\src\views\sms\SMSTemplate\index.vue
-->
<template>
  <div>
    <a-button type="primary" @click="add">添加短信模板</a-button>
    <a-table
      :columns="columns"
      :data-source="tableData"
      :pagination="false"
      :loading="loading"
      @change="handleTableChange"
    >
      <template #action="{ text }">
        <span>
          <a @click="edit(text)">修改</a>
        </span>
      </template>
    </a-table>

    <Edit ref="editRef" :type="type"></Edit>
  </div>
</template>
<script>
  import { ref } from 'vue'
  import Edit from './Edit'
  const columns = [
    {
      title: '短信模板内容',
      dataIndex: 'messageContent',
    },
    {
      title: 'temp_id',
      dataIndex: 'temp_id',
    },
    {
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  ]
  export default {
    components: { Edit },
    setup() {
      const editRef = ref(null)
      let type = ref('')

      let tableData = ref([])
      function handleTableChange() {}
      function add() {
        type.value = 'add'
        editRef.value.init()
      }
      return { columns, handleTableChange, add, tableData, editRef, type }
    },
  }
</script>
