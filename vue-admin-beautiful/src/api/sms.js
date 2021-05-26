/*
 * @Description:
 * @Date: 2021-01-22 11:30:33
 * @LastEditors: yinwb
 * @LastEditTime: 2021-05-25 16:19:18
 * @FilePath: \vue-admin-beautiful\src\api\sms.js
 */
import request from '@/utils/request'

export const addTemplate = (data) =>
  request.post('/admin/createMessageTemplate', data)

export const addWxMessageTemplate = (data) =>
  request.post('/admin/addWxMessageTemplate', data)
