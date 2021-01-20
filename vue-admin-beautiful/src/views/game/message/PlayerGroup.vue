<!--
 * @Description: 
 * @Date: 2021-01-19 18:23:59
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-20 18:11:23
 * @FilePath: \vue-admin-beautiful\src\views\game\message\PlayerGroup.vue
-->
<template>
  <a-modal v-model:visible="visible" title="比赛设置" :width="1000">
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
    <a-transfer
      :titles="titles"
      :locale="{
        itemUnit: '人',
        notFoundContent: '列表为空',
      }"
      :data-source="tableData"
      :target-keys="targetKeys"
      :filter-option="
        (inputValue, item) => item.title.indexOf(inputValue) !== -1
      "
      :show-select-all="false"
      @change="onChange"
    >
      <template
        #children="{
          filteredItems,
          selectedKeys,
          disabled: listDisabled,
          onItemSelect,
        }"
      >
        <a-table
          :row-selection="
            getRowSelection({
              disabled: listDisabled,
              selectedKeys,
              onItemSelect,
            })
          "
          :columns="columns"
          :data-source="filteredItems"
          size="small"
          :style="{ pointerEvents: listDisabled ? 'none' : null }"
        />
      </template>
    </a-transfer>
    <!-- <a-switch
    un-checked-children="disabled"
    checked-children="disabled"
    :checked="disabled"
    style="margin-top: 16px"
    @change="triggerDisable"
  />
  <a-switch
    un-checked-children="showSearch"
    checked-children="showSearch"
    :checked="showSearch"
    style="margin-top: 16px"
    @change="triggerShowSearch"
  /> -->
  </a-modal>
</template>
<script>
  import { ref } from 'vue'
  import { buildTeam } from '@/api/game.js'
  import { message } from 'ant-design-vue'
  const columns = [
    {
      dataIndex: 'nickName',
      title: '球员昵称',
    },
    {
      dataIndex: 'role',
      title: '擅长位置',
    },
    {
      dataIndex: 'sex',
      title: '性别',
    },
    {
      dataIndex: 'age',
      title: '年龄',
    },
  ]

  export default {
    setup() {
      let tableData = ref([])
      let targetKeys = ref([])
      let titles = ref([])
      let visible = ref(false)
      let gameId = ref(null)
      function handleChange() {}

      function init(row) {
        visible.value = true
        gameId.value = row._id
        titles.value[0] = row.ATeamName
        titles.value[1] = row.BTeamName
        let players = row.playerIds.map((item) => ({
          ...item,
          key: item._id,
          title: item.nickName,
        }))
        let rightPlayers = row.BTeamPlayers.map((item) => item._id)
        targetKeys.value = rightPlayers
        tableData.value = players
      }

      function getRowSelection({ disabled, selectedKeys, onItemSelect }) {
        return {
          getCheckboxProps: (item) => ({ disabled: disabled || item.disabled }),
          // onSelectAll(selected, selectedRows) {
          //   const treeSelectedKeys = selectedRows
          //     .filter((item) => !item.disabled)
          //     .map(({ key }) => key)
          //   const diffKeys = selected
          //     ? difference(treeSelectedKeys, selectedKeys)
          //     : difference(selectedKeys, treeSelectedKeys)
          //   onItemSelectAll(diffKeys, selected)
          // },
          onSelect({ key }, selected) {
            onItemSelect(key, selected)
          },
          selectedRowKeys: selectedKeys,
        }
      }

      function onChange(nextTargetKeys) {
        targetKeys.value = nextTargetKeys
      }

      function handleOk() {
        let ATeamPlayers = [] //a队
        let BTeamPlayers = [] //b队
        tableData.value.forEach((item) => {
          if (targetKeys.value.findIndex((ele) => ele === item._id) < 0) {
            ATeamPlayers.push(item)
          }
        })
        if (targetKeys.value && targetKeys.value.length) {
          targetKeys.value.forEach((item) => {
            let BTeatItem = tableData.value.find((ele) => ele._id === item)
            if (BTeatItem && BTeatItem._id) {
              BTeamPlayers.push(BTeatItem)
            }
          })
        }
        let submit = {
          _id: gameId.value,
          ATeamPlayers,
          BTeamPlayers,
        }
        buildTeam(submit).then((res) => {
          if (res.code === 0) {
            message.success('组队成功')
            visible.value = false
          }
        })
      }
      return {
        getRowSelection,
        columns,
        visible,
        titles,
        handleChange,
        tableData,
        targetKeys,
        init,
        onChange,
        handleOk,
      }
    },
  }
</script>
