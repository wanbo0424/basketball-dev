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
      let form = reactive({
        ATeamName: '',
        BTeamName: '',
        ATeamScore: 0,
        BTeamScore: 0,
      })
      function init(row) {
        for (let key in form) {
          form[key] = row[key]
        }
        form._id = row.gameId
        delete form.gameId
        visible.value = true
      }

      const handleOk = () => {
        let submit = toRaw(form)
        update(submit).then((res) => {
          if (res.code === 0) {
            visible.value = false
            emit('refresh')
          }
        })
      }
      return {
        init,
        visible,
        form,
        handleOk,
      }
    },
  }
</script>
