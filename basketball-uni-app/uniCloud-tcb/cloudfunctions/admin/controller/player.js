'use strict';
const db = uniCloud.database();
const Play = db.collection("player_list");
module.exports = {
	query: async function () {
		var {pageCurrent , pageSize} = this.params ;
		var queryCmds = Play.where({_id:dbCmd.in(data.roleIds)}) ;
		var dataInDB = await queryCmds.get() ;
		var totalRow = ( await queryCmds.count() ).total ;
		var page = this.getPage({
			pageCurrent ,
			pageSize ,
			totalRow ,
			dataInDB 
		});
	}
}
