<!--
 * @Description: 比赛信息
 * @Date: 2021-01-11 15:27:06
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-11 17:15:18
 * @FilePath: \vue-admin-beautiful\src\views\game\message\index.vue
-->
<template>
  <div>
    <a-button type="primary" @click="add">添加比赛信息{{ visible }}</a-button>
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
      @change="currentChange"
      show-less-items
    />

    <Edit ref="editCarousel"></Edit>
  </div>
</template>
<script>
  import Edit from './Edit'
  import { ref, onMounted, reactive } from 'vue'
  import { getList } from '@/api/player'
  const columns = [
    {
      title: 'uuid',
      dataIndex: 'uuid',
    },
    {
      title: '比赛时间',
      dataIndex: 'gameDate',
    },
    {
      title: '比赛地点',
      dataIndex: 'gameAddress',
    },
  ]
  export default {
    components: { Edit },
    setup() {
      const loadingRef = ref(false)
      const data = ref([])
      const editCarousel = ref(null)

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
        getList(submit).then((res) => {
          if (res.code === 0) {
            data.value = res.data.rows
            pagination.current = res.data.current
            pagination.total = res.data.count
          }
        })
      }

      function currentChange(page) {
        pagination.current = page
        loadData(pagination)
      }

      function add() {
        // visible.value = true
        editCarousel.value.init()
      }

      onMounted(() => {
        loadData()
      })

      return {
        columns,
        data,
        pagination,
        loading: loadingRef,
        handleTableChange,
        currentChange,
        add,
        editCarousel,
      }
    },
  }
</script>
