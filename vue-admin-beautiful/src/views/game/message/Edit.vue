<template>
  <a-modal v-model:visible="visible" title="比赛设置">
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
    <a-form :model="form" :label-col="labelCol">
      <a-form-item label="比赛地点" :wrapper-col="{ span: 12, offset: 0 }">
        <a-input placeholder="比赛地点" v-model:value="form.gameAddress" />
      </a-form-item>
      <!-- <a-form-item label="比赛时间">
        <a-date-picker show-time v-model:value="form.gameDate">
          <template v-slot:renderExtraFooter>extra footer</template>
        </a-date-picker>
      </a-form-item> -->
      <a-form-item label="比赛时间" :wrapper-col="{ span: 12, offset: 0 }">
        <a-date-picker
          v-model:value="form.gameDate"
          :show-time="{ format: 'MMMM Do YYYY, HH:mm:ss' }"
          type="date"
          placeholder="选择比赛时间"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="名额C" :wrapper-col="{ span: 12, offset: 2 }">
        <a-input v-model:value="form.COverage" />
      </a-form-item>
      <a-form-item label="名额PF" :wrapper-col="{ span: 12, offset: 2 }">
        <a-input v-model:value="form.PFOverage" />
      </a-form-item>
      <a-form-item label="名额SF" :wrapper-col="{ span: 12, offset: 2 }">
        <a-input v-model:value="form.SFOverage" />
      </a-form-item>
      <a-form-item label="名额SG" :wrapper-col="{ span: 12, offset: 2 }">
        <a-input v-model:value="form.SGOverage" />
      </a-form-item>
      <a-form-item label="名额PG" :wrapper-col="{ span: 12, offset: 2 }">
        <a-input v-model:value="form.PGOverage" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
  import { reactive, ref, toRaw } from 'vue'
  import moment from 'moment'
  import { add, update } from '@/api/game'
  import { message } from 'ant-design-vue'
  export default {
    emits: ['refresh'],
    setup(props, { emit }) {
      let visible = ref(false)
      let type = ref('')
      const loading = ref(false)

      let form = reactive({
        gameAddress: '',
        gameDate: '',
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
        }
      }

      function handleOk() {
        let submit = toRaw(form)
        submit.gameDate = moment(submit.gameDate).format('YYYY-MM-DD HH:mm:ss')
        let submitFun = type.value === 'edit' ? update : add
        submitFun(submit)
          .then((res) => {
            if (res.code === 0) {
              visible.value = false
              message.success('修改成功')
              emit('refresh')
            }
          })
          .catch((err) => {
            console.log(err)
            message.error('修改失败')
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
