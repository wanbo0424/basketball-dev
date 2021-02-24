const {
	Controller
} = require('uni-cloud-router')
module.exports = class AController extends Controller {
	async apply() {
		console.log(this)
		return 3
	}

}
