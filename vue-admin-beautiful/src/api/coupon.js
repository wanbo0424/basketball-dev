/*
 * @Description:
 * @Date: 2021-05-11 10:31:46
 * @Author: yinwb
 * @LastEditors: yinwb
 * @LastEditTime: 2021-05-11 11:07:05
 * @FilePath: \vue-admin-beautiful\src\api\coupon.js
 */
import request from '@/utils/request'

export const createCoupon = (data) => request.post('/admin/createCoupon', data)

export const couponList = (data) => request.get('/admin/couponList', data)
