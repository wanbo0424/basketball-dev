import request from '@/utils/request'

export const addBanner = (data) => {
  let formData = new FormData()
  for (let key in data) {
    formData.append(key, data[key])
  }
  return request({
    url: '/admin/applets/addBanner',
    method: 'post',
    data: formData,
    contentType: 'multipart/form-data',
  })
}

export const bannerList = () => request.get('/admin/applets/bannerList')

export const syncBucketList = () => request.get('/admin/applets/syncBucketList')

export const deleteBanner = (params) =>
  request.delete(`/admin/applets/deleteBanner`, { params })
