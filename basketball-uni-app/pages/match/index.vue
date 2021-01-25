<template>
	<view style="height: 100%;">
		<template v-for="(item, index) in matchList">
			<u-card style="height: 60rpx;" margin="30rpx 20rpx" :title="`比赛地点：${item.gameAddress}`" :sub-title="item.gameDate" :key="index">
				<view class="" slot="body">
					<view class="">
						{{item.ATeamName}}:{{item.ATeamScore}} vs  {{item.BTeamName}}:{{item.BTeamScore}}
					</view>
					<view class="">
						个人得分：{{item.personScore}}
					</view>
				</view>
			</u-card>
		</template>
	</view>
</template>

<script>
	import http from '../../api/index.js'
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				matchList: []
			}
		},
		computed: {
			...mapGetters([
			  'userInfo',
			])
		 },
		mounted() {
			http.get('weapp/player/getCareerList', {params: {openId: this.userInfo.openId}}).then(res => {
				if(res.data.code === 0) {
					this.matchList = res.data.data
				}
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
