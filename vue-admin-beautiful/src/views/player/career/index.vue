<!--
 * @Description: 球员生涯
 * @Date: 2021-01-15 17:24:23
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-15 18:06:48
 * @FilePath: \vue-admin-beautiful\src\views\player\career\index.vue
-->
<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="false"
      :loading="loading"
      @change="handleTableChange"
    ></a-table>

    <a-pagination
      v-model="pagination.current"
      :total="pagination.total"
      :pageSize="pagination.pageSize"
      :show-total="(total) => `总共  ${total}  条数据`"
      @change="currentChange"
      show-less-items
    />
  </div>
</template>
<script>
  import { ref, onMounted, reactive } from 'vue'
  import { getPlayerList } from '@/api/player'
  const columns = [
    {
      title: 'id',
      dataIndex: '_id',
    },
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
      dataIndex: 'mobile',
    },
  ]
  export default {
    setup() {
      const loadingRef = ref(false)
      const data = ref([])

      const pagination = reactive({
        pageSize: 5,
        current: 1,
        total: 0,
      })

      function handleTableChange() {}

      function loadData() {
        let submit = {
          ...pagination,
        }
        delete submit.total
        getPlayerList(submit).then((res) => {
          if (res.code === 0) {
            data.value = res.data.docs
            pagination.current = res.data.pageInfo.current
            pagination.total = res.data.pageInfo.total
          }
        })
      }

      function currentChange(page) {
        pagination.current = page
        loadData(pagination)
      }

      onMounted(() => {
        loadData()
      })

      return {
        columns,
        loading: loadingRef,
        handleTableChange,
        currentChange,
        data,
        pagination,
      }
    },
  }
</script>
