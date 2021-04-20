<!--
 * @Description: 
 * @Date: 2021-01-08 17:59:51
 * @LastEditors: yinwb
 * @LastEditTime: 2021-04-20 17:37:28
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
    </a-table>

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
  import { ref, onMounted, reactive, unref } from 'vue'
  import { getList, groupPlayerBatch } from '@/api/player'
  import moment from 'moment'
  import Search from './Search'
  const columns = [
    {
      title: 'id',
      dataIndex: '_id',
      width: 90,
      ellipsis: true,
    },
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
      slots: { customRender: 'createTime' },
    },
    {
      title: '分组',
      dataIndex: 'team',
      slots: { customRender: 'team' },
    },
  ]
  export default {
    components: { Search },
    setup() {
      const loadingRef = ref(false)
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
        getList(submit).then((res) => {
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
        moment,
        loadData,
        changeTeam,
        groupPlayer,
      }
    },
  }
</script>
