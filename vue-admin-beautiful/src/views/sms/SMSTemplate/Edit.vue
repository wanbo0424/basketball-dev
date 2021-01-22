<!--
 * @Description: 编辑短信模板
 * @Date: 2021-01-22 11:38:36
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-22 14:47:53
 * @FilePath: \vue-admin-beautiful\src\views\sms\SMSTemplate\Edit.vue
-->
<template>
  <a-modal v-model:visible="visible" title="短信模板" :width="800">
    <template v-slot:footer>
      <a-button key="back" @click="visible = false">取消</a-button>
      <a-button key="submit" type="primary" @click="handleOk">确定</a-button>
    </template>

    <a-form ref="formRef" :model="form">
      <a-form-item label="短信模板">
        <a-textarea
          placeholder="短信模板"
          v-model:value="form.content"
          style="width: 500px"
          :auto-size="{ minRows: 2, maxRows: 5 }"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
  import { ref, reactive } from 'vue'
  import { addTemplate } from '@/api/sms'
  export default {
    setup(props) {
      const formRef = ref(null)
      let visible = ref(false)
      let form = reactive({
        content: '',
      })
      function init() {
        visible.value = true
        if (props.type === 'add') {
          formRef.value.resetFields()
        }
      }
      function handleOk() {
        addTemplate({ type: 2, content: form.content }).then((res) => {
          console.log(res)
        })
      }
      return {
        form,
        visible,
        handleOk,
        init,
        formRef,
      }
    },
  }
</script>
