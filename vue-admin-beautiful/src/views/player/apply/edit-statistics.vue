<!--
import { reactive } from 'vue';
 * @Description: 
 * @Date: 2021-05-06 09:35:39
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-05-06 11:16:29
 * @FilePath: \vue-admin-beautiful\src\views\player\apply\edit-statistics.vue
-->
<template>
  <a-modal v-model:visible="visible" title="个人技术统计" :width="800">
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
      <a-form-item label="比赛得分" prop="personScore">
        <a-input placeholder="比赛得分" v-model:value="form.personScore" />
      </a-form-item>
      <a-form-item label="积分" prop="evaluationScore">
        <a-input placeholder="积分" v-model:value="form.evaluationScore" />
      </a-form-item>
      <a-form-item label="得分能力" prop="scoreAbility">
        <a-input placeholder="得分能力" v-model:value="form.scoreAbility" />
      </a-form-item>
      <a-form-item label="命中率" prop="hitRateScore">
        <a-input placeholder="命中率" v-model:value="form.hitRateScore" />
      </a-form-item>
      <a-form-item label="体能" prop="physicalScore">
        <a-input placeholder="体能" v-model:value="form.physicalScore" />
      </a-form-item>
      <a-form-item label="稳定" prop="stableScore">
        <a-input placeholder="稳定" v-model:value="form.stableScore" />
      </a-form-item>
      <a-form-item label="是否Mvp" prop="isMvp">
        <a-radio-group v-model:value="form.isMvp">
          <a-radio :value="true">是</a-radio>
          <a-radio :value="false">否</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
  import { reactive, ref } from 'vue'
  import { updatePlayer } from '@/api/player'
  export default {
    emits: ['refresh'],
    setup(props, { emit }) {
      let visible = ref(false)
      let loading = ref(false)
      let form = reactive({
        personScore: '',
        evaluationScore: '',
        scoreAbility: '',
        hitRateScore: '',
        physicalScore: '',
        stableScore: '',
        isMvp: false,
      })
      const handleOk = () => {
        loading = true
        updatePlayer(form)
          .then((res) => {
            if (res.code === 0) {
              visible.value = false
              emit('refresh')
            }
          })
          .finally(() => {
            loading.value = false
          })
      }
      const init = (row) => {
        for (let key in form) {
          form[key] = row[key]
        }
        form._id = row._id
        visible.value = true
      }
      return {
        visible,
        form,
        handleOk,
        loading,
        init,
      }
    },
  }
</script>
