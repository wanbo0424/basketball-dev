<!--
 * @Description: 
 * @Date: 2021-01-25 16:27:02
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-25 17:18:19
 * @FilePath: \vue-admin-beautiful\src\views\activity\gameOrder\index.vue
-->
<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="tableData"
      :pagination="false"
      :loading="loading"
    >
      <template #createTime="{ text: createTime }">
        <span>
          {{
            createTime ? moment(createTime).format('YYYY-MM-DD HH:mm:ss') : ''
          }}
        </span>
      </template>
      <template #status="{ text: status }">
        <a-badge v-if="status === 0" status="error" text="未支付" />
        <a-badge v-if="status === 1" status="processing" text="已支付定金" />
        <a-badge v-if="status === 2" status="success" text="已支付全款" />
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
  </div>
</template>
<script>
  import { ref, reactive, onMounted } from 'vue'
  import { getOrderList } from '@/api/gameOrder'
  import moment from 'moment'
  const columns = [
    { title: '支付订单号', dataIndex: 'order_id' },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      slots: { customRender: 'createTime' },
    },
    {
      title: '支付时间',
      dataIndex: 'time_end',
    },
    { title: '下单人', dataIndex: 'creatorName' },
    {
      title: '支付状态',
      dataIndex: 'status',
      slots: { customRender: 'status' },
    },
  ]
  export default {
    setup() {
      let loadingRef = ref(false)
      let tableData = ref([])

      let pagination = reactive({
        pageSize: 5,
        current: 1,
        total: 0,
      })
      function currentChange(page) {
        pagination.current = page
        loadData(pagination)
      }
      function loadData() {
        let submit = {
          ...pagination,
        }
        delete submit.total
        loadingRef.value = true
        getOrderList(submit).then((res) => {
          if (res.code === 0) {
            loadingRef.value = false
            tableData.value = res.data.docs
            pagination.pageSize = res.data.pageInfo.pageSize
            pagination.current = res.data.pageInfo.current
            pagination.total = res.data.pageInfo.total
          }
        })
      }
      onMounted(() => loadData())
      return {
        loading: loadingRef,
        tableData,
        pagination,
        columns,
        currentChange,
        moment,
      }
    },
  }
</script>
