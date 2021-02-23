const {
	Controller
} = require('uni-cloud-router')
module.exports = class PlayerController extends Controller {
	async apply() {
	    const { ctx } = this;
		console.log(ctx)
	    const requestBody = ctx.data;
	    const _id = await ctx.service.player.addPlayer(requestBody);
	    this.success(_id);
	  }

}
