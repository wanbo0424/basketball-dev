module.exports = {
	sendSms: async function () {
		try {
			const res = await uniCloud.sendSms({
			  smsKey: '735b32b1f7fe2a3c9bcfb7eb368c9a42',
			  smsSecret: 'bdf8d960723be9feac68ffe205b0bda0',
			  phone: this.params.phone,
			  templateId: this.params.templateId,
			  data: this.params,
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
	}
}

