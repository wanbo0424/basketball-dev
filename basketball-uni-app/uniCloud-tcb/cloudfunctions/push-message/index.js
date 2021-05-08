'use strict';
const openapi = require('mp-cloud-openapi')
const openapiWeixin = openapi.initWeixin({
  appId: 'wx3bd5737539be2537',
  secret: '8eae0891e063bca56590224254363fcc'
})
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let body = {}
	if(event && event.body) {
		body = JSON.parse(event.body)
	}
	const {
	  accessToken,
	  expiresIn
	} = await openapiWeixin.auth.getAccessToken()
	const res = openapiWeixin.customerServiceMessage.send({
	  accessToken,
	  touser: body.openId,   //用户的 OpenID
	  msgtype: body.msgtype,   //消息类型
	  text: body.text   //文本消息，msgtype="text" 时必填
	})
	//返回数据给客户端
	return res
};
