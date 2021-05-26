<!--
import { reactive } from 'vue';
 * @Description: 
 * @Date: 2021-05-25 14:22:23
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-05-25 15:21:45
 * @FilePath: \vue-admin-beautiful\src\views\game\gameSetting\edit-basic-game.vue
-->
<template>
  <a-modal v-model:visible="visible" title="设置" :width="800">
    <template v-slot:footer>
      <a-button key="back" @click="visible = false">取消</a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="loading"
        @click="handleOk"
      >
        确定
      </a-button>
    </template>

    <a-form :model="form" labelAlign="left">
      <a-form-item label="比赛球馆">
        <a-input placeholder="比赛球馆" v-model:value="form.gameAddress" />
      </a-form-item>
      <a-form-item label="具体位置">
        <a-input placeholder="具体位置" v-model:value="form.specificLocation" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
  import { reactive, ref } from 'vue'
  import { batchUpdateGame } from '@/api/game.js'
  export default {
    emits: ['refresh'],
    setup(props, { emit }) {
      let visible = ref(false)
      let loading = ref(false)
      let currentRow = reactive({})
      let form = reactive({
        gameAddress: '',
        specificLocation: '',
      })
      const init = (row) => {
        visible.value = true
        currentRow.value = row
      }
      const handleOk = () => {
        loading.value = true
        form.gameIds = currentRow.value.gameDates.map((item) => item.gameId)
        console.log(form)
        batchUpdateGame(form).then((res) => {
          loading.value = false
          if (res.code === 0) {
            visible.value = false
            emit('refresh')
          }
        })
      }
      return {
        form,
        init,
        loading,
        handleOk,
        visible,
      }
    },
  }
</script>
