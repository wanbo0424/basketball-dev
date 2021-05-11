<!--
 * @Description: 优惠券
 * @Date: 2021-05-11 09:45:13
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-05-11 11:36:22
 * @FilePath: \vue-admin-beautiful\src\views\activity\coupon\index.vue
-->
<template>
  <div>
    <a-button type="primary" @click="add">添加</a-button>
    <a-table
      :columns="columns"
      :data-source="tableData"
      :pagination="false"
      :loading="loading"
    >
      <template #couponType="{ record }">
        {{ record.couponType === 0 ? '折扣券' : '代金券' }}
      </template>
    </a-table>

    <add-coupon ref="couponRef"></add-coupon>
  </div>
</template>
<script>
  import { ref, onMounted } from 'vue'
  import AddCoupon from './add-coupon'
  import { couponList } from '@/api/coupon'
  const columns = [
    { title: '优惠券Id', dataIndex: '_id' },
    {
      title: '类型',
      dataIndex: 'couponType',
      slots: { customRender: 'couponType' },
    },
    {
      title: '折扣/代金',
      dataIndex: 'allowance',
    },
    {
      title: '支付状态',
      dataIndex: 'status',
      slots: { customRender: 'status' },
    },
  ]
  export default {
    components: { AddCoupon },
    setup() {
      let tableData = ref([])
      let loading = ref(false)
      const couponRef = ref(null)
      const add = () => {
        couponRef.value.init()
      }
      const loadData = () => {
        couponList().then((res) => {
          if (res.code === 0) {
            console.dir(res)
            tableData.value = res.data
          }
        })
      }
      onMounted(() => {
        loadData()
      })
      return {
        columns,
        tableData,
        loading,
        add,
        couponRef,
      }
    },
  }
</script>
