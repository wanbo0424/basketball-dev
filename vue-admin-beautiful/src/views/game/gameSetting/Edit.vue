<!--
 * @Description: 比阿尼基比赛信息
 * @Date: 2021-04-06 14:22:46
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-04-06 16:07:49
 * @FilePath: \vue-admin-beautiful\src\views\game\gameSetting\Edit.vue
-->
<template>
  <a-modal v-model:visible="visible" title="比赛设置" :width="800">
    <template v-slot:footer>
      <a-button key="back" @click="handleCancel">取消</a-button>
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
      <a-form-item label="比赛地点">
        <a-input placeholder="比赛地点" v-model:value="form.gameAddress" />
      </a-form-item>
      <a-form-item label="比赛日期">
        <a-date-picker
          v-model:value="form.gameDate"
          :show-time="{ format: 'MMMM Do YYYY, HH:mm:ss' }"
          type="date"
          placeholder="选择比赛日期"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="比赛时间段">
        <time-tag></time-tag>
      </a-form-item>
      <a-form-item label="A队名称">
        <a-input v-model:value="form.ATeamName" />
      </a-form-item>
      <a-form-item label="B队名称">
        <a-input v-model:value="form.BTeamName" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
  import { reactive, ref } from 'vue'
  import TimeTag from './time-tag'
  export default {
    components: {
      TimeTag,
    },
    setup() {
      let visible = ref(false)
      let type = ref('')
      let form = reactive({
        gameAddress: '',
        gameDate: '',
        startTime: '',
        endTime: '',
        COverage: null,
        PFOverage: null,
        SFOverage: null,
        SGOverage: null,
        PGOverage: null,
      })
      function init(row, pageType) {
        type.value = pageType
        visible.value = true
        if (pageType === 'edit') {
          for (let key in form) {
            form[key] = row[key]
          }
          form._id = row._id
        } else {
          for (let key in form) {
            form[key] = ''
          }
          delete form._id
        }
      }
      function handleOk() {
        console.log(form)
        debugger
      }
      return {
        visible,
        init,
        form,
        handleOk,
      }
    },
  }
</script>
