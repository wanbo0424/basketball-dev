<!--
 * @Description: 
 * @Date: 2021-05-27 15:18:55
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-05-27 16:40:51
 * @FilePath: \vue-admin-beautiful\src\views\player\suggest\index.vue
-->
<template>
  <div>
    <!-- <a-button type="primary" style="margin-left: 20px" @click="pullPlayer">
      同步球员
    </a-button> -->
    <a-button type="primary" style="margin-left: 20px" @click="add">
      新增
    </a-button>
    <a-table
      :columns="columns"
      :loading="loading"
      :data-source="data"
      :pagination="false"
    >
      <template #type="{ text }">
        <span>{{ typeMap[text.type] }}</span>
      </template>
      <template #action="{ text }">
        <a @click="suggest(text)">建议</a>
      </template>
    </a-table>

    <edit-suggest ref="editSuggestRef"></edit-suggest>
  </div>
</template>
<script>
  import { syncPlayer, getPlayerSuggests } from '@/api/player.js'
  import { ref, onMounted } from 'vue'
  import EditSuggest from './edit-suggest'
  const typeMap = {
    0: '得分',
    1: '稳定',
    2: '体能',
    3: '命中率',
    4: '防守',
  }
  const columns = [
    // {
    //   title: 'openId',
    //   dataIndex: 'openId',
    // },
    {
      title: '类别',
      // dataIndex: 'type',
      slots: { customRender: 'type' },
    },
    {
      title: '建议',
      dataIndex: 'sugesstion',
    },
    {
      title: '操作',
      slots: { customRender: 'action' },
    },
  ]
  export default {
    components: { EditSuggest },
    setup() {
      let data = ref([])
      let loading = ref(false)
      let editSuggestRef = ref(null)
      const suggest = (row) => {
        editSuggestRef.value.init(row)
      }
      const pullPlayer = () => {
        loading.value = true
        syncPlayer().then((res) => {
          loading.value = false
          if (res.code === 0) {
            data.value = res.data
          }
        })
      }
      const add = () => {
        editSuggestRef.value.init()
      }
      const loadData = () => {
        getPlayerSuggests().then((res) => {
          if (res.code === 0) {
            data.value = res.data
          }
        })
      }
      onMounted(() => {
        loadData()
      })
      return {
        suggest,
        pullPlayer,
        columns,
        data,
        loading,
        loadData,
        add,
        editSuggestRef,
        typeMap,
      }
    },
  }
</script>
