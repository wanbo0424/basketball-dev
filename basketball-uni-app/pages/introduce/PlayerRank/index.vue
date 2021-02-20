<template>
	<u-table>
		<u-tr class="u-tr">
			<u-th class="u-th">昵称</u-th>
			<u-th class="u-th">得分</u-th>
			<u-th class="u-th">积分</u-th>
			<u-th class="u-th">排名</u-th>
		</u-tr>
		<u-tr class="u-tr" v-for="(item, index) in tableData">
			<u-td class="u-td">{{itme.nickName}}</u-td>
			<u-td class="u-td">{{itme.personalScore}}</u-td>
			<u-td class="u-td">{{item.evaluationScore}}</u-td>
			<u-td class="u-td">{{index + 1}}</u-td>
		</u-tr>
	</u-table>
</template>

<script>
	import http from '../../../api/index.js'
	export default {
		data() {
			tableData: []
		},
		methods: {
			loadData() {
				http.get('weapp/player/getPlayerRank').then(res => {
					if(res.data.code === 0) {
						this.tableData = res.data.data
					}
				})
			}
		},
		mounted() {
			this.loadData()
		}
	}
</script>

<style>
</style>
