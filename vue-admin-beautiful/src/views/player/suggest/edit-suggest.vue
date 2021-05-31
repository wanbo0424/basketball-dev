<!--
 * @Description: 
 * @Date: 2021-05-27 16:20:21
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-05-31 10:11:55
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
    <a-form
      :model="form"
      labelAlign="left"
      :label-col="{ span: 4 }"
      :wrapperCol="{ span: 14 }"
    >
      <a-form-item label="内容" prop="sugesstion">
        <a-textarea
          placeholder="内容"
          v-model:value="form.sugesstion"
          :rows="4"
        />
      </a-form-item>
      <a-form-item label="类型" prop="type">
        <a-select :size="size" v-model:value="form.type" style="width: 200px">
          <a-select-option v-for="(item, index) in options" :key="index">
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
  import { ref, reactive } from 'vue'
  import { updatePlaySuggest, addPlaySuggest } from '@/api/player'
  const options = [
    { label: '得分', value: 0 },
    { label: '稳定', value: 1 },
    { label: '体能', value: 2 },
    { label: '命中率', value: 3 },
    { label: '防守', value: 4 },
  ]
  export default {
    setup() {
      let loading = ref(false)
      let visible = ref(false)
      let type = ref('')
      let form = reactive({
        sugesstion: '',
        type: '',
      })
      const handleOk = () => {
        if (type.value === 'add') {
          addPlaySuggest(form).then((res) => {
            if (res.code === 0) {
              visible.value = false
            }
          })
        } else {
          updatePlaySuggest(form).then((res) => {
            if (res.code === 0) {
              visible.value = false
            }
          })
        }
      }
      const init = (row = {}) => {
        visible.value = true
        if (row._id) {
          type.value = 'edit'
          for (let key in row) {
            form[key] = row[key]
          }
          form._id = row._id
        } else {
          type.value = 'add'
        }
      }
      return {
        loading,
        handleOk,
        visible,
        init,
        form,
        options,
      }
    },
  }
</script>
