const {
	Service
} = require('uni-cloud-router')
module.exports = class HelloService extends Service {
	async addPlayer(data = {}) {
		console.log(data)
		const result = await this.db.collection('players').add(data);
		return result
	}
}
