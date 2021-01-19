<!--
 * @Description: 
 * @Date: 2021-01-19 18:23:59
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-19 18:47:42
 * @FilePath: \vue-admin-beautiful\src\views\game\message\PlayerGroup.vue
-->
<template>
  <a-transfer
    :data-source="tableData"
    :target-keys="targetKeys"
    :disabled="disabled"
    :filter-option="(inputValue, item) => item.title.indexOf(inputValue) !== -1"
    :show-select-all="false"
    @change="onChange"
  >
    <template
      #children="{
        filteredItems,
        selectedKeys,
        disabled: listDisabled,
        onItemSelectAll,
        onItemSelect,
      }"
    >
      <a-table
        :row-selection="
          getRowSelection({
            disabled: listDisabled,
            selectedKeys,
            onItemSelectAll,
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
  <a-switch
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
  />
</template>
<script>
  import { ref } from 'vue'
  const columns = [
    {
      dataIndex: 'nickName',
      title: '球员昵称',
    },
    {
      dataIndex: 'role',
      title: '擅长位置',
    },
  ]

  export default {
    setup() {
      const tableData = ref([])
      const targetKeys = ref([])
      function handleChange() {}

      function getRowSelection() {
        //   {
        //   disabled,
        //   selectedKeys,
        //   onItemSelectAll,
        //   onItemSelect,
        // }
        // return {
        // getCheckboxProps: (item) => ({ disabled: disabled || item.disabled }),
        // onSelectAll(selected, selectedRows) {
        //   // const treeSelectedKeys = selectedRows
        //   //   .filter((item) => !item.disabled)
        //   //   .map(({ key }) => key)
        //   // const diffKeys = selected
        //   //   ? difference(treeSelectedKeys, selectedKeys)
        //   //   : difference(selectedKeys, treeSelectedKeys)
        //   onItemSelectAll(diffKeys, selected)
        // },
        // onSelect({ key }, selected) {
        //   onItemSelect(key, selected)
        // },
        // selectedRowKeys: selectedKeys,
        // }
      }
      return {
        getRowSelection,
        columns,
        handleChange,
        tableData,
        targetKeys,
      }
    },
  }
</script>
