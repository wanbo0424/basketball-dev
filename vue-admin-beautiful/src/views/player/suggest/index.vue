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
    <a-button type="primary" style="margin-left: 20px" @click="pullPlayer">
      同步球员
    </a-button>
    <a-table
      :columns="columns"
      :loading="loading"
      :data-source="data"
      :pagination="false"
    >
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
  const columns = [
    {
      title: 'openId',
      dataIndex: 'openId',
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
        editSuggestRef,
      }
    },
  }
</script>
