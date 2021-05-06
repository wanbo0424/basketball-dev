<template>
	<view style="height: 100%;">
		<template v-for="(item, index) in matchList">
			<u-card style="height: 60rpx;" margin="30rpx 20rpx" :title="`比赛地点：${item.gameAddress}`" :sub-title="item.gameDate" :key="index">
				<view class="match-card" slot="body">
					<view class="team-score-item">
						A：{{item.ATeamScore || 0}} <span style="font-weight: 600;padding: 0 20rpx;">vs</span>  B：{{item.BTeamScore || 0}}
					</view>
					<view class="team-item">
						所在球队：{{item.team}}
					</view>
					<view class="score-item">
						个人得分：<span style="font-size: 30rpx;color: #A71D5D;">{{item.personScore}}</span>
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
			http.get('weapp/allOrderList', { params: { openId: this.userInfo.openId } }).then(res => {
				if(res.data.code === 0) {
					this.matchList = res.data.data
				}
			})
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.match-card{
	.team-score-item{
		font-size: 34rpx;
	}
}
</style>
