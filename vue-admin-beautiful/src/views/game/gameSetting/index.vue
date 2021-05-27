<!--
 * @Description: 比赛设置
 * @Date: 2021-04-06 10:18:37
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-05-27 14:57:55
 * @FilePath: \vue-admin-beautiful\src\views\game\gameSetting\index.vue
-->
<template>
  <div>
    <a-button type="primary" @click="add">添加比赛信息</a-button>
    <a-table
      :columns="columns"
      :data-source="data"
      class="components-table-demo-nested"
      :pagination="false"
    >
      <template #operation="{ record }">
        <a @click="edit(record)">设置</a>
      </template>
      <template #expandedRowRender="{ record }">
        <a-table
          :columns="childColumns"
          :data-source="record.gameDates"
          :scroll="{ x: 'calc(700px + 50%)' }"
          :pagination="false"
        >
          <template #gameStatus="{ record }">
            <a-badge v-if="!record.gameStatus" color="#f50" text="未举行" />
            <a-badge
              v-if="record.gameStatus === 1"
              color="#87d068"
              text="正在举行"
            />
            <a-badge
              v-if="record.gameStatus === 2"
              color="#87d068"
              text="已举行"
            />
            <a-badge
              v-if="record.gameStatus === 3"
              color="#87d068"
              text="未开放"
            />
          </template>
          <template #operation="{ record }">
            <span class="table-operation">
              <a @click="editTeam(record)">设置</a>
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
    <!-- 新增 -->
    <add-form ref="editCarousel" @refresh="loadData"></add-form>
    <!-- 设置 -->
    <setting-team ref="settingTeamRef" @refresh="loadData"></setting-team>
    <!-- 设置 -->
    <edit-basic-game ref="editBasicRef"></edit-basic-game>
  </div>
</template>
<script>
  import { ref, onMounted, reactive } from 'vue'
  import AddForm from './add-form'
  import SettingTeam from './setting-team'
  import EditBasicGame from './edit-basic-game'
  import { gameListByAddress } from '@/api/game'
  const columns = [
    { title: '比赛地点', dataIndex: '_id', key: '_id' },
    { title: '设置', slots: { customRender: 'operation' } },
  ]
  const childColumns = [
    { title: '比赛Id', dataIndex: 'gameId', key: 'gameId' },
    { title: '比赛日期', dataIndex: 'gameDate', key: 'gameDate' },
    { title: '比赛时间段', dataIndex: 'gameTimeRange', key: 'gameTimeRange' },
    { title: 'A队名称', dataIndex: 'ATeamName', key: 'ATeamName' },
    { title: 'B队名称', dataIndex: 'BTeamName', key: 'BTeamName' },
    { title: 'A队得分', dataIndex: 'ATeamScore', key: 'ATeamScore' },
    { title: 'B队得分', dataIndex: 'BTeamScore', key: 'BTeamScore' },
    { title: '状态', slots: { customRender: 'gameStatus' } },
    { title: '操作', slots: { customRender: 'operation' } },
  ]
  export default {
    components: {
      AddForm,
      SettingTeam,
      EditBasicGame,
    },
    setup() {
      const data = ref([])
      const childData = ref([])
      const editCarousel = ref(null)
      const settingTeamRef = ref(null)
      const editBasicRef = ref(null)
      let pagination = reactive({
        pageSize: 10,
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

      function currentChange(page) {
        pagination.current = page
        loadData(pagination)
      }

      function add() {
        editCarousel.value.init()
      }

      const editTeam = (row) => {
        settingTeamRef.value.init(row)
      }

      const edit = (row) => {
        editBasicRef.value.init(row)
      }
      onMounted(() => {
        loadData()
      })
      return {
        pagination,
        columns,
        childColumns,
        editCarousel,
        settingTeamRef,
        editBasicRef,
        data,
        childData,
        add,
        currentChange,
        editTeam,
        edit,
        loadData,
      }
    },
  }
</script>
