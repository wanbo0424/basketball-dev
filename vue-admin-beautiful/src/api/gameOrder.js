/*
 * @Description:
 * @Date: 2021-01-25 16:50:59
 * @LastEditors: yinwb
 * @LastEditTime: 2021-02-19 15:25:57
 * @FilePath: \vue-admin-beautiful\src\api\gameOrder.js
 */
import request from '@/utils/request'

export const getOrderList = (params) =>
  request.get('/admin/getOrderList', { params })
