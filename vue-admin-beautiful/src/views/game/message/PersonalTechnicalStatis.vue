<!--
 * @Description: 个人技术统计
 * @Date: 2021-01-21 10:08:16
 * @LastEditors: yinwb
 * @LastEditTime: 2021-02-20 16:10:14
 * @FilePath: \vue-admin-beautiful\src\views\game\message\PersonalTechnicalStatis.vue
-->
<template>
  <a-modal v-model:visible="visible" title="个人技术统计" :width="800">
    <template v-slot:footer>
      <a-button key="back" @click="visible = false">取消</a-button>
    </template>

    <a-table :columns="columns" :data-source="tableData" bordered>
      <template
        v-for="col in ['personScore', 'evaluationScore']"
        :key="col"
        #[col]="{ text, record }"
      >
        <div>
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="(e) => handleChange(e.target.value, record._id, col)"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>

      <template #operation="{ record }">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="save(record)">保存</a>
            <a-popconfirm title="确定取消?" @confirm="cancel(record._id)">
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a
              v-bind="editingKey !== '' ? { disabled: 'disabled' } : {}"
              @click="edit(record._id)"
            >
              编辑
            </a>
          </span>
        </div>
      </template>
    </a-table>
  </a-modal>
</template>
<script>
  import { ref } from 'vue'
  import { setPersonalsStatis } from '@/api/game.js'

  const columns = [
    {
      title: '昵称',
      dataIndex: 'nickName',
    },
    {
      title: '擅长位置',
      dataIndex: 'role',
    },
    {
      title: '个人得分',
      dataIndex: 'personScore',
      slots: { customRender: 'personScore' },
    },
    {
      title: '本场比赛积分',
      dataIndex: 'evaluationScore',
      slots: { customRender: 'evaluationScore' },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      slots: { customRender: 'operation' },
    },
  ]
  export default {
    setup() {
      let visible = ref(false)
      let tableData = ref([])
      let cacheData = ref([])
      let editingKey = ref('')

      function init(row) {
        visible.value = true
        tableData.value = row.playerIds
        tableData.value.forEach((item) => {
          item.editable = false
        })
        cacheData.value = JSON.parse(JSON.stringify(tableData.value))
      }

      // 保存句柄
      function save(record) {
        setPersonalsStatis({
          _id: record._id,
          nickName: record.nickName,
          openId: record.openId,
          gameId: record.gameId,
          personScore: record.personScore,
          evaluationScore: record.evaluationScore,
        }).then(() => {
          record.editable = false
          editingKey.value = ''
        })
      }

      function edit(key) {
        const newData = [...tableData.value]
        const target = newData.filter((item) => key === item._id)[0]
        editingKey.value = key
        if (target) {
          target.editable = true
          tableData.value = newData
        }
      }
      function cancel(key) {
        const newData = JSON.parse(JSON.stringify(cacheData.value))
        const target = newData.filter((item) => key === item._id)[0]
        editingKey.value = ''
        if (target) {
          delete target.editable
          Object.assign(target, newData.filter((item) => key === item._id)[0])
          tableData.value = newData
        }
      }
      function handleChange(value, key, column) {
        const newData = [...tableData.value]
        const target = newData.filter((item) => key === item._id)[0]
        if (target) {
          target[column] = value
          tableData.value = newData
        }
      }

      return {
        visible,
        save,
        columns,
        tableData,
        cancel,
        edit,
        init,
        editingKey,
        handleChange,
      }
    },
  }
</script>
