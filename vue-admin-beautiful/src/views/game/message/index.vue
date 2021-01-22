<!--
 * @Description: 比赛信息
 * @Date: 2021-01-11 15:27:06
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-22 18:49:43
 * @FilePath: \vue-admin-beautiful\src\views\game\message\index.vue
-->
<template>
  <div>
    <a-button type="primary" @click="add">添加比赛信息</a-button>
    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="false"
      :loading="loading"
      @change="handleTableChange"
    >
      <template #status="{ text: gameStatus }">
        <a-badge v-if="gameStatus === 0" status="default" text="未举办" />
        <a-badge
          v-else-if="gameStatus === 1"
          status="processing"
          text="举行中"
        />
        <a-badge v-else status="default" text="已举行" />
      </template>
      <template #score="{ text }">
        <span>
          {{ text.ATeamName }}:{{ text.ATeamScore }} vs {{ text.BTeamName }}:{{
            text.BTeamScore
          }}
        </span>
      </template>
      <template #player="{ text: playerIds }">
        <span>{{ playerNick(playerIds) }}</span>
      </template>
      <template #createTime="{ text: createTime }">
        <span>{{ moment(createTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
      </template>
      <template #action="{ text }">
        <span>
          <a @click="edit(text)">修改</a>
          <a-divider type="vertical" />
          <a @click="score(text)">比分</a>
          <a-divider type="vertical" />
          <a @click="group(text)">球员分组</a>
          <a-divider type="vertical" />
          <a @click="personalStatis(text)">个人统计</a>
          <a-divider type="vertical" />
          <a @click="personalStatis(text)">发送短信</a>
        </span>
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
    <!-- 设置比分 -->
    <score-setting ref="scoreSet"></score-setting>
    <!-- 修改 -->
    <Edit ref="editCarousel" @refresh="loadData"></Edit>
    <!-- 球员分组 -->
    <player-group ref="groupRef"></player-group>
    <!-- 个人技术统计 -->
    <personal-technical-statis
      ref="personalsStatisRef"
    ></personal-technical-statis>
  </div>
</template>
<script>
  import Edit from './Edit'
  import ScoreSetting from './ScoreSetting'
  import PlayerGroup from './PlayerGroup'
  import PersonalTechnicalStatis from './PersonalTechnicalStatis'
  import moment from 'moment'
  import { ref, onMounted, reactive } from 'vue'
  import { list } from '@/api/game'
  const columns = [
    {
      title: 'id',
      dataIndex: '_id',
    },
    {
      title: '比赛时间',
      dataIndex: 'gameDate',
    },
    {
      title: '比赛地点',
      dataIndex: 'gameAddress',
    },
    {
      title: '比赛状态',
      dataIndex: 'gameStatus',
      slots: { customRender: 'status' },
    },
    {
      title: '球员列表',
      dataIndex: 'playerIds',
      slots: { customRender: 'player' },
    },
    {
      title: '比分',
      // dataIndex: 'playerIds',
      slots: { customRender: 'score' },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      slots: { customRender: 'createTime' },
    },
    {
      title: '操作',
      key: 'action',
      slots: { customRender: 'action' },
    },
  ]
  export default {
    components: {
      Edit,
      ScoreSetting,
      PlayerGroup,
      PersonalTechnicalStatis,
    },

    setup() {
      let loadingRef = ref(false)
      const data = ref([])
      const editCarousel = ref(null)
      const scoreSet = ref(null)
      const groupRef = ref(null)
      const personalsStatisRef = ref(null)

      let pagination = reactive({
        pageSize: 5,
        current: 1,
        total: 0,
      })

      function handleTableChange() {}

      function playerNick(playerIds) {
        if (playerIds && playerIds.length) {
          let players = playerIds.map(
            (item) => `${item.nickName}(${item.role})`
          )
          return players.join(',')
        } else {
          return ''
        }
      }
      function loadData() {
        let submit = {
          ...pagination,
        }
        delete submit.total
        loadingRef = true
        list(submit)
          .then((res) => {
            if (res.code === 0) {
              data.value = res.data.docs
              pagination.pageSize = res.data.pageInfo.pageSize
              pagination.current = res.data.pageInfo.current
              pagination.total = res.data.pageInfo.total
            }
          })
          .finally(() => {
            loadingRef = false
          })
      }

      function currentChange(page) {
        pagination.current = page
        loadData(pagination)
      }

      function add() {
        editCarousel.value.init()
      }

      function edit(text) {
        editCarousel.value.init(text, 'edit')
      }

      function score(text) {
        scoreSet.value.init(text)
      }

      function group(row) {
        groupRef.value.init(row)
      }

      function personalStatis(row) {
        personalsStatisRef.value.init(row)
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
        edit,
        editCarousel,
        loadData,
        playerNick,
        group,
        score,
        scoreSet,
        groupRef,
        personalStatis,
        personalsStatisRef,
        moment,
      }
    },
  }
</script>
