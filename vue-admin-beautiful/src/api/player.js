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

export function groupPlayerBatch(data) {
  return request({
    url: '/admin/groupPlayer',
    method: 'post',
    data,
  })
}
