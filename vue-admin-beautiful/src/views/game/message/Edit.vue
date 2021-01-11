<template>
  <a-modal v-model:visible="visible" title="Title">
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
    <a-form :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="比赛地点">
        <a-input placeholder="比赛地点" v-model:value="form.gameAddress" />
      </a-form-item>
      <!-- <a-form-item label="比赛时间">
        <a-date-picker show-time v-model:value="form.gameDate">
          <template v-slot:renderExtraFooter>extra footer</template>
        </a-date-picker>
      </a-form-item> -->
      <a-form-item label="比赛时间">
        <a-date-picker
          v-model:value="form.gameDate"
          show-time
          type="date"
          placeholder="选择比赛时间"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="名额" :wrapper-col="{ span: 12, offset: 2 }">
        <a-input v-model:value="form.COverage" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 4 }">
        <a-input v-model:value="form.PFOverage" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 4 }">
        <a-input v-model:value="form.SFOverage" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 4 }">
        <a-input v-model:value="form.SGOverage" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 4 }">
        <a-input v-model:value="form.PGOverage" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
  import { reactive, ref, toRaw } from 'vue'
  import { add } from '@/api/game'
  export default {
    setup() {
      let visible = ref(false)
      const loading = ref(false)

      const form = reactive({
        gameAddress: '',
        gameDate: '',
        COverage: null,
        PFOverage: null,
        SFOverage: null,
        SGOverage: null,
        PGOverage: null,
      })

      function init() {
        visible.value = true
      }

      function handleOk() {
        add(toRaw(form)).then((res) => {
          if (res.code === 0) {
            debugger
          }
        })
      }

      function handleCancel() {}
      return {
        form,
        visible,
        loading,
        init,
        handleOk,
        handleCancel,
      }
    },
  }
</script>
