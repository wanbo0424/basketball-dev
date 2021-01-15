import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/admin/playerList',
    method: 'get',
    params,
  })
}

export function getPlayerList(params) {
  return request({
    url: '/admin/playerGroupList',
    method: 'get',
    params,
  })
}

export function doEdit(data) {
  return request({
    url: '/table/doEdit',
    method: 'post',
    data,
  })
}

export function doDelete(data) {
  return request({
    url: '/table/doDelete',
    method: 'post',
    data,
  })
}
