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
      <a-row type="flex" justify="space-around" align="middle">
        <a-col :sapn="18">
          <a-form-item label="比赛地点">
            <a-input placeholder="比赛地点" v-model:value="form.gameAddress" />
          </a-form-item>
        </a-col>
        <a-col :sapn="12">
          <!-- <a-form-item label="比赛时间">
        <a-date-picker show-time v-model:value="form.gameDate">
          <template v-slot:renderExtraFooter>extra footer</template>
        </a-date-picker>
      </a-form-item> -->
          <a-form-item label="比赛时间">
            <a-date-picker
              v-model:value="form.gameDate"
              :show-time="{ format: 'MMMM Do YYYY, HH:mm:ss' }"
              type="date"
              placeholder="选择比赛时间"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around" align="middle">
        <a-col :sapn="12">
          <a-form-item label="名额C">
            <a-input v-model:value="form.COverage" />
          </a-form-item>
        </a-col>
        <a-col :sapn="12">
          <a-form-item label="名额PF">
            <a-input v-model:value="form.PFOverage" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around" align="middle">
        <a-col :sapn="12">
          <a-form-item label="名额SF">
            <a-input v-model:value="form.SFOverage" />
          </a-form-item>
        </a-col>
        <a-col :sapn="12">
          <a-form-item label="名额SG">
            <a-input v-model:value="form.SGOverage" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around" align="middle">
        <a-col :sapn="12">
          <a-form-item label="名额PG">
            <a-input v-model:value="form.PGOverage" />
          </a-form-item>
        </a-col>
        <a-col :sapn="12">
          <a-form-item label="">
            <!-- <a-input v-model:value="form.COverage" /> -->
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around" align="middle">
        <a-col :sapn="12">
          <a-form-item label="A队名称">
            <a-input v-model:value="form.ATeamName" />
          </a-form-item>
        </a-col>
        <a-col :sapn="12">
          <a-form-item label="B队名称">
            <a-input v-model:value="form.BTeamName" />
          </a-form-item>
        </a-col>
      </a-row>
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
        } else {
          for (let key in form) {
            form[key] = ''
          }
          delete form._id
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
