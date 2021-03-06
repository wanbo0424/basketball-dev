import type { BasicTableProps, TableActionType, FetchParams, BasicColumn } from '../types/table';
import type { PaginationProps } from '../types/pagination';
import type { DynamicProps } from '/@/types/utils';
import { getDynamicProps } from '/@/utils';

import { ref, onUnmounted, unref } from 'vue';
import { isProdMode } from '/@/utils/env';
import { isInSetup } from '/@/utils/helper/vueHelper';
import { error } from '/@/utils/log';
import { watchEffect } from 'vue';
import type { FormActionType } from '/@/components/Form';

type Props = Partial<DynamicProps<BasicTableProps>>;

export function useTable(
  tableProps?: Props
): [(instance: TableActionType, formInstance: FormActionType) => void, TableActionType] {
  isInSetup();

  const tableRef = ref<Nullable<TableActionType>>(null);
  const loadedRef = ref<Nullable<boolean>>(false);
  const formRef = ref<Nullable<FormActionType>>(null);

  function register(instance: TableActionType, formInstance: FormActionType) {
    isProdMode() &&
      onUnmounted(() => {
        tableRef.value = null;
        loadedRef.value = null;
      });

    if (unref(loadedRef) && isProdMode() && instance === unref(tableRef)) {
      return;
    }
    tableRef.value = instance;
    formRef.value = formInstance;
    // tableProps && instance.setProps(tableProps);
    loadedRef.value = true;

    watchEffect(() => {
      tableProps && instance.setProps(getDynamicProps(tableProps));
    });
  }

  function getTableInstance(): TableActionType {
    const table = unref(tableRef);
    if (!table) {
      error(
        'The table instance has not been obtained yet, please make sure the table is presented when performing the table operation!'
      );
    }
    return table as TableActionType;
  }

  const methods: TableActionType & {
    getForm: () => FormActionType;
  } = {
    reload: async (opt?: FetchParams) => {
      getTableInstance().reload(opt);
    },
    setProps: (props: Partial<BasicTableProps>) => {
      getTableInstance().setProps(props);
    },
    redoHeight: () => {
      getTableInstance().redoHeight();
    },
    setLoading: (loading: boolean) => {
      getTableInstance().setLoading(loading);
    },
    getDataSource: () => {
      return getTableInstance().getDataSource();
    },
    getColumns: ({ ignoreIndex = false }: { ignoreIndex?: boolean } = {}) => {
      const columns = getTableInstance().getColumns({ ignoreIndex }) || [];
      return columns;
    },
    setColumns: (columns: BasicColumn[]) => {
      getTableInstance().setColumns(columns);
    },
    setTableData: (values: any[]) => {
      return getTableInstance().setTableData(values);
    },
    setPagination: (info: Partial<PaginationProps>) => {
      return getTableInstance().setPagination(info);
    },
    deleteSelectRowByKey: (key: string) => {
      getTableInstance().deleteSelectRowByKey(key);
    },
    getSelectRowKeys: () => {
      return getTableInstance().getSelectRowKeys();
    },
    getSelectRows: () => {
      return getTableInstance().getSelectRows();
    },
    clearSelectedRowKeys: () => {
      getTableInstance().clearSelectedRowKeys();
    },
    setSelectedRowKeys: (keys: string[] | number[]) => {
      getTableInstance().setSelectedRowKeys(keys);
    },
    getPaginationRef: () => {
      return getTableInstance().getPaginationRef();
    },
    getSize: () => {
      return getTableInstance().getSize();
    },
    updateTableData: (index: number, key: string, value: any) => {
      return getTableInstance().updateTableData(index, key, value);
    },
    getRowSelection: () => {
      return getTableInstance().getRowSelection();
    },
    getCacheColumns: () => {
      return getTableInstance().getCacheColumns();
    },
    getForm: () => {
      return unref(formRef) as FormActionType;
    },
  };

  return [register, methods];
}
