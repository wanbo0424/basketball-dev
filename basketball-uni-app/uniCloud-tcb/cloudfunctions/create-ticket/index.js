const customUserId = Date.now() + '';

exports.main = async () => {
	const ticket = uniCloud.customAuth().createTicket(customUserId, {
	  refresh: 10 * 60 * 1000 // 每十分钟刷新一次登录态， 默认为一小时
	})
	return ticket
}