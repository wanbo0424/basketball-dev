<!--
 * @Description: 
 * @Date: 2021-05-27 16:20:21
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-05-27 17:00:02
 * @FilePath: \vue-admin-beautiful\src\views\player\suggest\edit-suggest.vue
-->
<template>
  <a-modal v-model:visible="visible" title="建议" :width="800">
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
      <a-form-item label="内容" prop="sugesstion">
        <a-textarea
          placeholder="内容"
          v-model:value="form.sugesstion"
          :rows="4"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
  import { ref, reactive } from 'vue'
  import { updatePlaySuggest } from '@/api/player'
  export default {
    setup() {
      let loading = ref(false)
      let visible = ref(false)
      let form = reactive({
        sugesstion: '',
      })
      const handleOk = () => {
        updatePlaySuggest(form).then((res) => {
          if (res.code === 0) {
            visible.value = false
          }
        })
      }
      const init = (row) => {
        visible.value = true
        form._id = row._id
      }
      return {
        loading,
        handleOk,
        visible,
        init,
        form,
      }
    },
  }
</script>
