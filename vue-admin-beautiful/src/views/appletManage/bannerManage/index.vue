<!--
 * @Description: 
 * @Date: 2021-04-21 16:02:52
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-04-25 18:22:56
 * @FilePath: \vue-admin-beautiful\src\views\appletManage\bannerManage\index.vue
-->
<template>
  <a-button type="primary" @click="add">添加</a-button>
  <a-table
    :columns="columns"
    :data-source="data"
    class="components-table-demo-nested"
    :pagination="false"
  >
    <template #bannerUrl="{ text }">
      <img style="height: 100px" :src="text.url" alt="" />
    </template>
  </a-table>

  <add-banner ref="bannerRef"></add-banner>
</template>
<script>
  import AddBanner from './add-banner'
  import { ref, onMounted } from 'vue'
  import { bannerList } from '@/api/applets'
  const columns = [
    {
      title: 'banner图',
      slots: { customRender: 'bannerUrl' },
    },
  ]
  export default {
    components: { AddBanner },
    setup() {
      let bannerRef = ref(null)
      let data = ref([])
      const add = () => {
        bannerRef.value.init()
      }
      const loadData = () => {
        bannerList().then((res) => {
          data.value = res.data
        })
      }
      onMounted(() => {
        loadData()
      })
      return {
        columns,
        add,
        bannerRef,
        data,
      }
    },
  }
</script>
