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
    <template v-if="type === 'time'">
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
    <template v-else>
      <a-date-picker
        v-model:value="date"
        type="date"
        valueFormat="YYYY-mm-DD"
        placeholder="选择比赛日期"
        style="width: 100%"
        @change="handleDateOk"
      />
    </template>
  </template>
  <a-tag
    v-else
    @click="showInput"
    style="background: #fff; border-style: dashed"
  >
    <plus-outlined />
    {{ type === 'time' ? '时间段' : '日期' }}
  </a-tag>
</template>
<script>
  import { reactive, toRefs, ref } from 'vue'
  import { PlusOutlined } from '@ant-design/icons-vue'
  export default {
    emits: ['input'],
    components: { PlusOutlined },
    props: {
      type: String,
    },
    setup(props, { emit }) {
      const { type } = toRefs(props)
      const startRef = ref()
      let startTime = ref('')
      let endTime = ref('')
      let date = ref('')
      const state = reactive({
        tags: type.value === 'time' ? ['14:00--16:00'] : [],
        inputVisible: false,
        inputValue: '',
      })
      const showInput = () => {
        state.inputVisible = true
        if (type.value === 'time') {
          startTime.value = ''
          endTime.value = ''
        } else {
          date.value = ''
        }
      }
      const handleClose = (removedTag) => {
        const tags = state.tags.filter((tag) => tag !== removedTag)
        state.tags = tags
        emit('update:modelValue', state.tags)
      }

      const handleDateOk = (date) => {
        state.inputVisible = false
        state.tags.push(date)
        emit('update:modelValue', state.tags)
      }

      const handleEndTime = () => {
        state.inputVisible = false
        state.tags.push(`${startTime.value}--${endTime.value}`)

        emit('update:modelValue', state.tags)
      }

      return {
        ...toRefs(state),
        showInput,
        startRef,
        date,
        startTime,
        endTime,
        handleDateOk,
        handleEndTime,
        handleClose,
      }
    },
  }
</script>
