<!--
 * @Description: 
 * @Date: 2021-04-21 16:02:52
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-04-26 18:41:22
 * @FilePath: \vue-admin-beautiful\src\views\appletManage\bannerManage\index.vue
-->
<template>
  <div>
    <a-button type="primary" @click="add">添加</a-button>
    <a-button type="primary" style="margin-left: 20px" @click="syncBucket">
      同步bucket
    </a-button>
    <a-table
      :columns="columns"
      :loading="loading"
      :data-source="data"
      class="components-table-demo-nested"
      :pagination="false"
    >
      <template #bannerUrl="{ text }">
        <a-image :width="150" :src="text.banner_url" />
      </template>
      <template #action="{ text }">
        <a-popconfirm
          title="确定删除?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="deletes(text)"
        >
          <a href="#">删除</a>
        </a-popconfirm>
      </template>
    </a-table>

    <add-banner ref="bannerRef"></add-banner>
  </div>
</template>
<script>
  import AddBanner from './add-banner'
  import { ref, onMounted } from 'vue'
  import { bannerList, deleteBanner, syncBucketList } from '@/api/applets'
  const columns = [
    {
      title: 'banner图',
      slots: { customRender: 'bannerUrl' },
    },
    {
      title: '操作',
      slots: { customRender: 'action' },
    },
  ]
  export default {
    components: { AddBanner },
    setup() {
      let bannerRef = ref(null)
      let loading = ref(false)
      let data = ref([])
      const add = () => {
        bannerRef.value.init()
      }
      const loadData = () => {
        bannerList().then((res) => {
          data.value = res.data
        })
      }
      const deletes = (row) => {
        loading.value = true
        deleteBanner({ name: row.name }).then((res) => {
          loading.value = false
          if (res.code === 0) {
            loadData()
          }
        })
      }
      const syncBucket = () => {
        syncBucketList().then((res) => {
          console.log(res)
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
        deletes,
        loading,
        syncBucket,
      }
    },
  }
</script>
