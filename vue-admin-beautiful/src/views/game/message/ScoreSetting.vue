<!--
import { reactive } from 'vue';
 * @Description: 
 * @Date: 2021-01-19 15:23:05
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-19 16:27:32
 * @FilePath: \vue-admin-beautiful\src\views\game\message\ScoreSetting.vue
-->
<template>
  <a-modal v-model:visible="visible" title="比赛设置">
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
    <a-form :model="form">
      <a-form-item label="A队分数" :wrapper-col="{ span: 12, offset: 2 }">
        <a-input placeholder="A队分数" v-model:value.number="form.ATeamScore" />
      </a-form-item>
      <a-form-item label="B队分数" :wrapper-col="{ span: 12, offset: 2 }">
        <a-input placeholder="B队分数" v-model:value.number="form.BTeamScore" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
  import { reactive, ref } from 'vue'
  import { gameScoreSet } from '@/api/game'
  export default {
    setup() {
      let visible = ref(false)
      let loading = ref(false)
      let form = reactive({
        _id: '',
        ATeamScore: '',
        BTeamScore: '',
      })

      function init(row) {
        visible.value = true
        for (let key in form) {
          form[key] = row[key]
        }
      }

      function handleOk() {
        gameScoreSet(form).then((res) => {
          console.log(res)
          debugger
        })
      }

      return {
        loading,
        visible,
        form,
        init,
        handleOk,
      }
    },
  }
</script>
