<!--
 * @Description: 
 * @Date: 2021-04-19 16:12:41
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-05-27 15:14:57
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
    <a-form-item label="OpenId">
      <a-input v-model:value="form.openId" placeholder="OpenId">
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
    <a-form-item v-if="showGroup">
      <a-button type="primary" @click="grouping" html-type="submit">
        分组
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script>
  import { reactive, ref, toRaw } from 'vue'
  export default {
    emits: ['load-data', 'group-player'],
    setup(props, { emit }) {
      let form = reactive({
        gameId: '',
        openId: '',
      })
      let showGroup = ref(false)
      const search = () => {
        let formValue = toRaw(form)
        showGroup.value = !!toRaw(formValue.gameId)
        emit('load-data', form)
      }
      const grouping = () => {
        emit('group-player', form)
      }
      return {
        form,
        search,
        grouping,
        showGroup,
      }
    },
  }
</script>
