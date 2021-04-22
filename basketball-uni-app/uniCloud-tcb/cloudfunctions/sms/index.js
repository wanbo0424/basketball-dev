'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log(JSON.parse(event.body))
	let body = JSON.parse(event.body)
	// //返回数据给客户端
	// return event
	
	try {
	    const res = await uniCloud.sendSms({
	      smsKey: '735b32b1f7fe2a3c9bcfb7eb368c9a42',
	      smsSecret: 'bdf8d960723be9feac68ffe205b0bda0',
	      phone: body.phone,
	      templateId: body.templateId,
	      data: body.data,
	    })
	    // 调用成功，请注意这时不代表发送成功
	    return res
	  } catch(err) {
	    // 调用失败
	    console.log(err.errCode)
	    console.log(err.errMsg)
	    return {
	      code: err.errCode,
	      msg: err.errMsg
	    }
	  }
};
