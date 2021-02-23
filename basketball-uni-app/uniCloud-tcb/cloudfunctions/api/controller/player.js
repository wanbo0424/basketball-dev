'use strict';
const db = uniCloud.database();
const Play = db.collection("player_list");
module.exports = {
	apply: async function () {
		await this.save(Play, this.params)
	}
}
