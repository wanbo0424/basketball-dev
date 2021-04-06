<!--
 * @Description: 比赛设置
 * @Date: 2021-04-06 10:18:37
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-04-06 15:42:03
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
      <template #expandedRowRender>
        <a-table
          :columns="ChildColumns"
          :data-source="childData"
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

    <!-- 修改 -->
    <Edit ref="editCarousel" @refresh="loadData"></Edit>
  </div>
</template>
<script>
  import { ref } from 'vue'
  import Edit from './Edit'

  const columns = [
    { title: '比赛地点', dataIndex: 'gameAddress', key: 'gameAddress' },
  ]
  const ChildColumns = [
    { title: '比赛Id', dataIndex: 'gameId', key: 'gameId' },
    { title: '比赛时间', dataIndex: 'gameDate', key: 'gameDate' },
  ]
  const GrandsonColumns = [
    { title: '比赛Id', dataIndex: 'gameId', key: 'gameId' },
    { title: '比赛时间段', dataIndex: 'gamePeriod', key: 'gamePeriod' },
  ]
  export default {
    components: {
      Edit,
    },
    setup() {
      const data = ref([])
      const childData = ref([])
      const editCarousel = ref(null)

      function add() {
        editCarousel.value.init()
      }
      return {
        columns,
        ChildColumns,
        GrandsonColumns,
        editCarousel,
        data,
        childData,
        add,
      }
    },
  }
</script>
