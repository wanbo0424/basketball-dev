<!--
 * @Description: 
 * @Date: 2021-04-23 14:19:36
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-04-26 15:56:50
 * @FilePath: \vue-admin-beautiful\src\views\appletManage\bannerManage\add-banner.vue
-->
<template>
  <a-modal v-model:visible="visible" title="banner设置" :width="800">
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
    <a-form labelAlign="left">
      <a-form-item label="上传图片">
        <a-upload
          list-type="picture-card"
          v-model:file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
        >
          <div v-if="fileList.length < 8">
            <plus-outlined />
            <div class="ant-upload-text">上传</div>
          </div>
        </a-upload>
        <a-modal
          :visible="previewVisible"
          :footer="null"
          @cancel="previewVisible = false"
        >
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
  import { ref } from 'vue'
  import { PlusOutlined } from '@ant-design/icons-vue'
  import { addBanner } from '@/api/applets'
  export default {
    components: {
      PlusOutlined,
    },
    setup(props, { emit }) {
      let visible = ref(false)
      let loading = ref(false)
      let fileList = ref([])
      const previewImage = ref('')
      const previewVisible = ref(false)
      const init = () => {
        visible.value = true
      }
      function getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => resolve(reader.result)
          reader.onerror = (error) => reject(error)
        })
      }
      const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj)
        }
        previewImage.value = file.url || file.preview
        previewVisible.value = true
      }
      const handleChange = ({ fileList: newFileList }) => {
        fileList.value = newFileList
      }
      const handleOk = () => {
        // let submit = {
        //   file: fileList.value.map((item) => item.originFileObj),
        // }
        let submit = {}
        fileList.value.forEach((item, index) => {
          submit[`file${index + 1}`] = item.originFileObj
        })
        loading.value = true
        addBanner(submit).then((res) => {
          loading.value = false
          if (res.code === 0) {
            emit('refresh')
          }
        })
      }
      return {
        visible,
        fileList,
        init,
        handlePreview,
        previewVisible,
        previewImage,
        handleChange,
        handleOk,
        loading,
      }
    },
  }
</script>
