<!--
 * @Description: 比赛信息
 * @Date: 2021-04-06 14:22:46
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-05-25 09:56:59
 * @FilePath: \vue-admin-beautiful\src\views\game\gameSetting\add-form.vue
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
      <a-form-item label="球馆名称">
        <a-input placeholder="比赛地点" v-model:value="form.gameAddress" />
      </a-form-item>
      <a-form-item label="纬度">
        <a-input placeholder="纬度" v-model:value="form.latitude" />
      </a-form-item>
      <a-form-item label="经度">
        <a-input placeholder="经度" v-model:value="form.longitude" />
      </a-form-item>
      <a-form-item label="具体位置">
        <a-input placeholder="具体位置" v-model:value="form.specificLocation" />
      </a-form-item>
      <a-form-item label="比赛日期">
        <!-- <a-date-picker
          v-model:value="form.gameDates"
          :show-time="{ format: 'MMMM Do YYYY, HH:mm:ss' }"
          type="date"
          placeholder="选择比赛日期"
          style="width: 100%"
        /> -->
        <time-tag type="date" v-model="form.gameDates"></time-tag>
      </a-form-item>
      <a-form-item label="比赛时间段">
        <time-tag type="time" v-model="form.gameTimeRanges"></time-tag>
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
  import { add } from '@/api/game'
  export default {
    components: {
      TimeTag,
    },
    emits: ['refresh'],
    setup(props, { emit }) {
      let visible = ref(false)
      let type = ref('')
      let form = reactive({
        gameAddress: '',
        latitude: '',
        longitude: '',
        specificLocation: '',
        gameDates: [],
        gameTimeRanges: [],
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
        add(form).then((res) => {
          if (res.code === 0) {
            visible.value = false
            emit('refresh')
          }
        })
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
