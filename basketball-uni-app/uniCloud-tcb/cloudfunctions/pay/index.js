'use strict';
const {
	wxConfigMp,
	wxConfigApp,
	wxConfigH5,
	aliConfigMp,
	aliConfigApp,
	aliConfigH5,
	// aliConfigSandbox
} = require('config')

const uniPay = require('unipay')
const uniID = require('uni-id')

const db = uniCloud.database()
exports.main = async (event, context) => {
	let {
		provider,
		outTradeNo,
		uniIdToken
	} = event
	
	
	// await db.collection('order').where({
	// 	outTradeNo,
	// 	uid
	// }).update({
	// 	payment_channel: provider
	// })

	// const userList = await db.collection('uni-id-users').where({
	// 	_id: uid
	// }).get()
	// const userInfo = userList.data[0]

	let uniPayInstance = uniPay.initWeixin(wxConfigMp),
		notifyUrl =
		`https://8798e3c5-3cd6-4ecc-8b5c-f75aca13865b.bspapp.com/http/payment-notify/${provider}_${context.PLATFORM}`,
		openid,
		tradeType


	// const {
	// 	totalFee,
	// } = orderList.data[0]

	let orderInfo

	// 请填写对应平台接收通知云函数对应的云函数url化地址，云函数url化请参考：https://uniapp.dcloud.io/uniCloud/http
	try {
		// 获取支付信息
		orderInfo = await uniPayInstance.getOrderInfo({
			openid, // App端支付时不需要openid，传入个undefined也没有影响
			outTradeNo,
			totalFee,
			subject: "测试商城的测试订单标题",
			body: "测试商城的测试订单详情",
			notifyUrl,
			tradeType
		})
	} catch (e) {
		console.log(e.message)
		return {
			code: -3,
			msg: '获取支付信息失败，请稍后再试'
		}
	}
	return {
		outTradeNo,
		orderInfo
	}
};
