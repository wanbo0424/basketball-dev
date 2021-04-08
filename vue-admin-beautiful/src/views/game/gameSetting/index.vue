<!--
 * @Description: 比赛设置
 * @Date: 2021-04-06 10:18:37
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-04-08 16:42:33
 * @FilePath: \vue-admin-beautiful\src\views\game\gameSetting\index.vue
-->
<template>
  <div>
    <a-button type="primary" @click="add">添加比赛信息</a-button>
    <a-table
      :columns="columns"
      :data-source="data"
      class="components-table-demo-nested"
    >
      <template #operation>
        <a>Publish</a>
      </template>
      <template #expandedRowRender="{ record }">
        <a-table
          :columns="childColumns"
          :data-source="record.gameDates"
          :pagination="false"
        >
          <template #status>
            <span>
              <a-badge status="success" />
              Finished
            </span>
          </template>
          <template #operation>
            <span class="table-operation">
              <a>Pause</a>
              <a>Stop</a>
              <a-dropdown>
                <template #overlay>
                  <a-menu>
                    <a-menu-item>Action 1</a-menu-item>
                    <a-menu-item>Action 2</a-menu-item>
                  </a-menu>
                </template>
                <a>
                  More
                  <down-outlined />
                </a>
              </a-dropdown>
            </span>
          </template>
        </a-table>
      </template>
    </a-table>
    <a-pagination
      v-model="pagination.current"
      :total="pagination.total"
      :pageSize="pagination.pageSize"
      @change="currentChange"
      :show-total="(total) => `总共  ${total}  条数据`"
      show-less-items
    />
    <!-- 修改 -->
    <add-form ref="editCarousel" @refresh="loadData"></add-form>
  </div>
</template>
<script>
  import { ref, onMounted, reactive } from 'vue'
  import AddForm from './add-form'
  import { gameListByAddress } from '@/api/game'
  const columns = [{ title: '比赛地点', dataIndex: '_id', key: '_id' }]
  const childColumns = [
    { title: '比赛Id', dataIndex: 'gameId', key: 'gameId' },
    { title: '比赛日期', dataIndex: 'gameDate', key: 'gameDate' },
  ]
  const GrandsonColumns = [
    { title: '比赛Id', dataIndex: 'gameId', key: 'gameId' },
    { title: '比赛时间段', dataIndex: 'gamePeriod', key: 'gamePeriod' },
    { title: '比赛状态', dataIndex: 'gameStatus', key: 'gameStatus' },
  ]
  export default {
    components: {
      AddForm,
    },
    setup() {
      const data = ref([])
      const childData = ref([])
      const editCarousel = ref(null)
      let pagination = reactive({
        pageSize: 5,
        current: 1,
        total: 0,
      })
      const loadData = () => {
        let submit = {
          ...pagination,
        }
        delete submit.total
        gameListByAddress(submit)
          .then((res) => {
            if (res.code === 0) {
              data.value = res.data.docs
              pagination.pageSize = res.data.pageInfo.pageSize
              pagination.current = res.data.pageInfo.current
              pagination.total = res.data.pageInfo.total
            }
          })
          .finally(() => {})
      }
      function add() {
        editCarousel.value.init()
      }
      onMounted(() => {
        loadData()
      })
      return {
        pagination,
        columns,
        childColumns,
        GrandsonColumns,
        editCarousel,
        data,
        childData,
        add,
      }
    },
  }
</script>
