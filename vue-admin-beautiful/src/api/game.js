/*
 * @Description:
 * @Date: 2021-01-11 17:42:14
 * @LastEditors: yinwb
 * @LastEditTime: 2021-05-25 16:19:10
 * @FilePath: \vue-admin-beautiful\src\api\game.js
 */
import request from '@/utils/request'
// import axios from 'axios'
// const instance = axios.create({baseURL: ''})
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
export const batchUpdateGame = (data) => {
  return request({
    url: '/admin/batchUpdateGame',
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

export const syncAddressList = () => request.get('/admin/syncAddressList')

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

export const pushSms = (data) => request.post('/admin/pushSms', data)
