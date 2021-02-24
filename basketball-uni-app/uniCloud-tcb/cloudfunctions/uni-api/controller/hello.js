const {
	Controller
} = require('uni-cloud-router')
module.exports = class HelloController extends Controller {
	async sayHello() {
		console.log(this)
		return 2
	}

}
