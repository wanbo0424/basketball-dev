<!--
 * @Description: 
 * @Date: 2021-01-08 17:59:51
 * @LastEditors: yinwb
 * @LastEditTime: 2021-05-08 19:13:11
 * @FilePath: \vue-admin-beautiful\src\views\player\apply\index.vue
-->
<template>
  <div>
    <search @load-data="loadData" @group-player="groupPlayer"></search>
    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="false"
      :loading="loading"
      @change="handleTableChange"
    >
      <template #createTime="{ text: createTime }">
        <span>
          {{
            createTime ? moment(createTime).format('YYYY-MM-DD HH:mm:ss') : ''
          }}
        </span>
      </template>
      <template #team="row">
        <a-radio-group
          name="radioGroup"
          @change="changeTeam(row)"
          v-model:value="row.text"
        >
          <a-radio value="A">A</a-radio>
          <a-radio value="B">B</a-radio>
        </a-radio-group>
      </template>
      <template #sms="{ record }">
        <a-badge v-if="!record.smsStatus" color="#2db7f5" text="未发送" />
        <a-badge
          v-if="record.smsStatus === 1"
          color="#87d068"
          text="发送成功"
        />
        <a-badge v-if="record.smsStatus === 2" color="#f50" text="发送失败" />
      </template>
      <template #pay="{ record }">
        <a-badge v-if="!record.payStatus" color="#f50" text="未支付" />
        <a-badge v-if="record.payStatus === 2" color="#87d068" text="已举行" />
      </template>
      <template #action="{ text }">
        <a-button
          type="link"
          :loading="smsLoading"
          :disabled="!text.payStatus"
          @click="sendMessage(text)"
        >
          发送短信
        </a-button>
        <a-button type="link" :loading="smsLoading" @click="pushApplets(text)">
          推送
        </a-button>
        <a-button type="link" @click="setStatistics(text)">个人统计</a-button>
      </template>
    </a-table>

    <a-pagination
      v-model="pagination.current"
      :total="pagination.total"
      :pageSize="pagination.pageSize"
      :show-total="(total) => `总共  ${total}  条数据`"
      @change="currentChange"
      show-less-items
    />

    <edit-statistics ref="statisticsRef" @refresh="loadData"></edit-statistics>
  </div>
</template>
<script>
  import { ref, onMounted, reactive, unref } from 'vue'
  import { getList, groupPlayerBatch } from '@/api/player'
  import { sendSms, pushSms } from '@/api/game'
  import { message } from 'ant-design-vue'
  import moment from 'moment'
  import Search from './Search'
  import EditStatistics from './edit-statistics'
  const columns = [
    // {
    //   title: 'id',
    //   dataIndex: '_id',
    //   width: 90,
    //   ellipsis: true,
    // },
    {
      title: '比赛id',
      dataIndex: 'gameId',
      ellipsis: true,
      width: 240,
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
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 170,
      slots: { customRender: 'createTime' },
    },
    {
      title: '分组',
      dataIndex: 'team',
      width: 150,
      slots: { customRender: 'team' },
    },
    {
      title: '短信状态',
      dataIndex: 'smsStatus',
      slots: { customRender: 'sms' },
    },
    {
      title: '支付状态',
      dataIndex: 'payStatus',
      slots: { customRender: 'pay' },
    },
    {
      title: '操作',
      slots: { customRender: 'action' },
    },
  ]
  export default {
    components: { Search, EditStatistics },
    setup() {
      const loadingRef = ref(false)
      const smsLoading = ref(false)
      const statisticsRef = ref(null)
      const data = ref([])

      const pagination = reactive({
        pageSize: 10,
        current: 1,
        total: 0,
      })

      function handleTableChange() {}

      function loadData(search = {}) {
        let submit = {
          ...pagination,
          ...search,
        }
        delete submit.total
        loadingRef.value = true
        getList(submit)
          .then((res) => {
            if (res.code === 0) {
              data.value = res.data.docs
              pagination.current = res.data.pageInfo.current
              pagination.total = res.data.pageInfo.total
            }
          })
          .finally(() => {
            loadingRef.value = false
          })
      }

      function currentChange(page) {
        pagination.current = page
        loadData(pagination)
      }

      const changeTeam = (row) => {
        let dataRef = unref(data)
        dataRef[row.index].team = row.text
      }

      const groupPlayer = () => {
        let params = {
          // gameId: search.gameId,
          datas: data.value,
        }
        groupPlayerBatch(params).then((res) => {
          if (res.code === 0) {
            loadData()
          }
        })
      }

      const sendMessage = (row) => {
        smsLoading.value = true
        sendSms({
          _id: row._id,
          phone: row.mobile,
          templateId: '11108',
          data: {
            player: row.nickName || '白雪王子',
            date: row.gameDate || '2020-05-20',
            gameAddress: row.gameAddress || '延平门',
          },
        })
          .then((res) => {
            if (res.code === 0 && res.data.data.success) {
              message.success('发送成功')
              loadData()
            } else {
              message.error('发送失败')
            }
          })
          .finally(() => {
            smsLoading.value = false
          })
      }

      const pushApplets = (row) => {
        pushSms({
          touser: row.openId,
          template_id: 'T4Bq3RFYlZ4f7GWSwuOAvONC9kVYZrBpPwtQ5NwxGZM',
          data: {
            time1: { value: '123' },
            thing2: { value: '456' },
          },
        }).then((res) => {
          console.log(res)
        })
      }

      const setStatistics = (row) => {
        statisticsRef.value.init(row)
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
        smsLoading,
        pagination,
        moment,
        loadData,
        changeTeam,
        groupPlayer,
        sendMessage,
        setStatistics,
        statisticsRef,
        pushApplets,
      }
    },
  }
</script>
