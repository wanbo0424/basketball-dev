<!--
 * @Description: 
 * @Date: 2021-05-25 16:10:13
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-05-25 16:49:54
 * @FilePath: \vue-admin-beautiful\src\views\activity\SMSTemplate\edit-wx.vue
-->
<template>
  <a-modal v-model:visible="visible" title="微信模板" :width="800">
    <template v-slot:footer>
      <a-button key="back" @click="visible = false">取消</a-button>
      <a-button key="submit" type="primary" @click="handleOk">确定</a-button>
    </template>

    <a-form ref="formRef" :model="form">
      <a-form-item label="模板Id">
        <a-input placeholder="模板Id" v-model:value="form.tid" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
  import { ref, reactive } from 'vue'
  import { message } from 'ant-design-vue'
  import { addWxMessageTemplate } from '@/api/sms.js'
  export default {
    setup() {
      let visible = ref(false)
      let form = reactive({
        tid: '',
      })
      const init = () => {
        visible.value = true
      }
      const handleOk = () => {
        form.kidList = [1, 2, 3, 4, 5]
        form.sceneDesc = '比赛预约通知'
        addWxMessageTemplate(form).then((res) => {
          if (res.code === 0) {
            message.success('新增成功')
          }
        })
      }
      return {
        visible,
        form,
        init,
        handleOk,
      }
    },
  }
</script>
