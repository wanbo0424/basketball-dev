/*
 * @Description:
 * @Date: 2021-01-11 17:42:14
 * @LastEditors: yinwb
 * @LastEditTime: 2021-01-11 18:50:08
 * @FilePath: \vue-admin-beautiful\src\api\game.js
 */
import request from '@/utils/request'

export const add = (data) => {
  return request({
    url: '/admin/gameAdd',
    method: 'post',
    data,
  })
}
