<!--
 * @Description: 
 * @Date: 2021-04-19 16:12:41
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-04-19 16:51:34
 * @FilePath: \vue-admin-beautiful\src\views\player\apply\Search.vue
-->
<template>
  <a-form
    layout="inline"
    :model="form"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
  >
    <a-form-item label="比赛id">
      <a-input v-model:value="form.gameId" placeholder="比赛id">
        <template #prefix>
          <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="search" html-type="submit">
        查询
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script>
  import { reactive } from 'vue'
  export default {
    emits: ['load-data'],
    setup(props, { emit }) {
      let form = reactive({
        gameId: '',
      })
      const search = () => {
        emit('load-data', form)
      }
      return {
        form,
        search,
      }
    },
  }
</script>
