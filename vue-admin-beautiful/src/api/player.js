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

export function updatePlayer(data) {
  return request({
    url: '/admin/updatePlayer',
    method: 'post',
    data,
  })
}

export function syncPlayer() {
  return request({
    url: '/admin/syncPlayer',
    method: 'get',
  })
}
export function updatePlaySuggest(data) {
  return request({
    url: '/admin/updatePlaySuggest',
    method: 'post',
    data,
  })
}
export function addPlaySuggest(data) {
  return request({
    url: '/admin/addPlaySuggest',
    method: 'post',
    data,
  })
}
export function getPlayerSuggests() {
  return request({
    url: '/admin/getPlayerSuggests',
    method: 'get',
  })
}
