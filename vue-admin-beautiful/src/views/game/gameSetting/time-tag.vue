<template>
  <template v-for="(tag, index) in tags" :key="index">
    <!-- <a-tooltip v-if="tag.length > 20" :title="tag">
      <a-tag :key="tag" :closable="index !== 0" @close="handleClose(tag)">
        {{ `${tag.slice(0, 20)}...` }}
      </a-tag>
    </a-tooltip> -->
    <a-tag closable @close="handleClose(tag)">
      {{ tag }}
    </a-tag>
  </template>
  <template v-if="inputVisible">
    <a-time-picker
      ref="startRef"
      v-model:value="startTime"
      valueFormat="HH:mm:ss"
    ></a-time-picker>
    ---
    <a-time-picker v-model:value="endTime" valueFormat="HH:mm:ss">
      <template #addon>
        <a-button size="small" type="primary" @click="handleEndTime">
          Ok
        </a-button>
      </template>
    </a-time-picker>
  </template>
  <a-tag
    v-else
    @click="showInput"
    style="background: #fff; border-style: dashed"
  >
    <plus-outlined />
    时间段
  </a-tag>
</template>
<script>
  import { reactive, toRefs, ref, nextTick } from 'vue'
  import { PlusOutlined } from '@ant-design/icons-vue'
  export default {
    emits: ['input'],
    components: { PlusOutlined },
    setup(props, { emit }) {
      const startRef = ref()
      let startTime = ref('')
      let endTime = ref('')
      const state = reactive({
        tags: ['14:00--16:00'],
        inputVisible: false,
        inputValue: '',
      })
      const showInput = () => {
        state.inputVisible = true
        startTime.value = ''
        endTime.value = ''
        nextTick(() => {
          startRef.value.focus()
        })
      }
      const handleClose = (removedTag) => {
        const tags = state.tags.filter((tag) => tag !== removedTag)
        state.tags = tags
        emit('input', state.tags)
      }
      const handleEndTime = () => {
        state.inputVisible = false
        state.tags.push(`${startTime.value}--${endTime.value}`)

        emit('input', state.tags)
      }

      return {
        ...toRefs(state),
        showInput,
        startRef,
        startTime,
        endTime,
        handleEndTime,
        handleClose,
      }
    },
  }
</script>
