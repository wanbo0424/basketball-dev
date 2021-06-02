<!--
import { ref } from 'vue';
 * @Description: 设置价格
 * @Date: 2021-05-31 18:19:28
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-06-01 14:47:57
 * @FilePath: \vue-admin-beautiful\src\views\game\gameSetting\edit-price-address.vue
-->
<template>
  <a-modal v-model:visible="visible" title="价格" :width="800">
    <a-button type="primary" @click="syncAddress">同步球馆</a-button>
    <a-table :columns="columns" :data-source="tableData" bordered>
      <template
        v-for="col in ['fullPrice', 'halfPrice']"
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
  import {
    syncAddressList,
    setAddressPrice,
    getAddressPriceList,
  } from '@/api/game.js'
  import { message } from 'ant-design-vue'
  const columns = [
    {
      title: '球馆',
      dataIndex: 'address',
    },
    {
      title: '全场价格',
      dataIndex: 'fullPrice',
      slots: { customRender: 'fullPrice' },
    },
    {
      title: '半场价格',
      dataIndex: 'halfPrice',
      slots: { customRender: 'halfPrice' },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 80,
      slots: { customRender: 'operation' },
    },
  ]
  export default {
    setup() {
      let visible = ref(false)
      let tableData = ref([])
      let editingKey = ref('')
      let cacheData = ref([])

      const init = async () => {
        visible.value = true
        await loadData()
        tableData.value.forEach((item) => {
          item.editable = false
        })
        cacheData.value = JSON.parse(JSON.stringify(tableData.value))
      }
      const loadData = () => {
        return getAddressPriceList().then((res) => {
          if (res.code === 0) {
            tableData.value = res.data
          }
        })
      }
      const syncAddress = () => {
        syncAddressList().then((res) => {
          if (res.code === 0) {
            tableData.value = res.data
          }
        })
      }

      const save = (record) => {
        setAddressPrice(record).then((res) => {
          if (res.code === 0) {
            record.editable = false
            editingKey.value = ''
            message.success('保存成功')
          }
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
        columns,
        tableData,
        edit,
        cancel,
        handleChange,
        syncAddress,
        init,
        visible,
        save,
        editingKey,
        loadData,
      }
    },
  }
</script>
