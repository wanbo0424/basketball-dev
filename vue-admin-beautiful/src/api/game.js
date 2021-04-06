/*
 * @Description:
 * @Date: 2021-01-11 17:42:14
 * @LastEditors: yinwb
 * @LastEditTime: 2021-04-06 17:56:35
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
export const update = (data) => {
  return request({
    url: '/admin/gameUpdate',
    method: 'post',
    data,
  })
}

export const list = (params) =>
  request({
    url: '/admin/gameList',
    method: 'get',
    params,
  })
export const gameListByAddress = (params) =>
  request.get('/admin/gameListByAddress', { params })

export const gameScoreSet = (data) =>
  request({
    url: '/admin/gameScoreSet',
    method: 'post',
    data,
  })

export const buildTeam = (data) =>
  request({
    url: '/admin/buildTeam',
    method: 'post',
    data,
  })

export const setPersonalsStatis = (data) =>
  request({
    url: '/admin/setPersonalsStatis',
    method: 'post',
    data,
  })
export const sendSms = (data) =>
  request({
    url: '/admin/sendSms',
    method: 'post',
    data,
  })
