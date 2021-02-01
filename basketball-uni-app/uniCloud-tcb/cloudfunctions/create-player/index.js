'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('player_list')
	//event为客户端上传的参数
	console.log('event', event)
	const res = await collection.add(event)
	//返回数据给客户端
	return res
};
