<template>
  <a-modal v-model:visible="visible" title="比赛球队设置" :width="800">
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
      <!-- <a-form-item label="比赛地点">
        <a-input placeholder="比赛地点" v-model:value="form.gameAddress" />
      </a-form-item> -->
      <a-form-item label="纬度">
        <a-input placeholder="纬度" v-model:value="form.latitude" />
      </a-form-item>
      <a-form-item label="经度">
        <a-input placeholder="经度" v-model:value="form.longitude" />
      </a-form-item>
      <a-form-item label="具体位置">
        <a-input placeholder="具体位置" v-model:value="form.specificLocation" />
      </a-form-item>
      <a-form-item label="比赛类型">
        <a-select
          :size="size"
          v-model:value="form.gameType"
          style="width: 200px"
        >
          <a-select-option
            v-for="(i, index) in [
              { value: 0, label: '全场' },
              { value: 1, label: '半场' },
            ]"
            :value="i.value"
            :key="index"
          >
            {{ i.label }}
          </a-select-option>
        </a-select>
        <!-- <a-input
          placeholder="价格"
          prefix="￥"
          suffix="RMB"
          v-model:value.number="form.price"
        /> -->
      </a-form-item>
      <a-form-item label="A队名">
        <a-input placeholder="A队名" v-model:value="form.ATeamName" />
      </a-form-item>
      <a-form-item label="B队名">
        <a-input placeholder="B队名" v-model:value="form.BTeamName" />
      </a-form-item>
      <a-form-item label="A队得分">
        <a-input placeholder="B队得分" v-model:value="form.ATeamScore" />
      </a-form-item>
      <a-form-item label="B队得分">
        <a-input placeholder="B队得分" v-model:value="form.BTeamScore" />
      </a-form-item>
      <a-form-item label="比赛时间段">
        <a-time-picker
          ref="startRef"
          v-model:value="startTime"
          valueFormat="HH:mm"
          format="HH:mm"
        ></a-time-picker>
        ---
        <a-time-picker
          v-model:value="endTime"
          valueFormat="HH:mm"
          format="HH:mm"
        >
          <template #addon>
            <a-button size="small" type="primary" @click="handleEndTime">
              Ok
            </a-button>
          </template>
        </a-time-picker>
      </a-form-item>
      <a-form-item label="比赛状态">
        <a-select
          :size="size"
          v-model:value="form.gameStatus"
          style="width: 200px"
        >
          <a-select-option
            v-for="(i, index) in [
              { value: 0, label: '未举行' },
              { value: 1, label: '正在举行' },
              { value: 2, label: '已举行' },
              { value: 3, label: '未开放' },
            ]"
            :value="i.value"
            :key="index"
          >
            {{ i.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
  import { ref, reactive, toRaw } from 'vue'
  import { update } from '@/api/game'
  export default {
    emits: ['refresh'],
    setup(props, { emit }) {
      let visible = ref(false)
      let startTime = ref('')
      let endTime = ref('')
      let form = reactive({
        ATeamName: '',
        BTeamName: '',
        ATeamScore: 0,
        BTeamScore: 0,
        gameStatus: '',
        gameTimeRange: '',
        // gameAddress: '',
        latitude: '',
        longitude: '',
        specificLocation: '',
        price: 0,
        gameType: '',
      })
      function init(row) {
        for (let key in form) {
          form[key] = row[key]
        }
        if (row.gameTimeRange) {
          startTime.value = row.gameTimeRange.split('--')[0]
          endTime.value = row.gameTimeRange.split('--')[1]
        }
        form._id = row.gameId
        delete form.gameId
        visible.value = true
      }

      const handleOk = () => {
        if (startTime.value && endTime.value) {
          form.gameTimeRange = `${startTime.value}--${endTime.value}`
        }
        let submit = toRaw(form)
        update(submit).then((res) => {
          if (res.code === 0) {
            visible.value = false
            emit('refresh')
          }
        })
      }
      return {
        startTime,
        endTime,
        init,
        visible,
        form,
        handleOk,
      }
    },
  }
</script>
