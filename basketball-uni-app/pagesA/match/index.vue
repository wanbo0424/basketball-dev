<template>
	<view style="height: 100vh;background-color: #fce1df;">
		<template v-for="(item, index) in matchList">
			<!-- <u-card style="height: 60rpx;" margin="30rpx 20rpx" :title="`比赛地点：${item.gameAddress}`" :sub-title="item.gameDate" :key="index">
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
					<view class="">
						比赛类型：{{ gameType(item) }}
					</view>
				</view>
			</u-card> -->
			<view class="match-item">	
				<u-row gutter="16" >
					<u-col span="3" >
						<view>
							{{moment(item.gameDate).format('HH:mm')}}
						</view>
						<view style="color: #999999; font-size: 24rpx;">
							{{moment(item.gameDate).format('YYYY-MM-DD')}}
						</view>
					</u-col>
					<u-col span="6">
						<view>
							A：{{item.ATeamScore || 0}} <span style="font-weight: 600;padding: 0 20rpx;">vs</span>  B：{{item.BTeamScore || 0}}
						</view>
						<view class="team-item" style="font-size: 25rpx;">
							所在球队：{{item.team}}
						</view>
						<view class="score-item" style="font-size: 25rpx;">
							个人得分：<span style="font-size: 30rpx;color: #A71D5D;">{{item.personScore}}</span>
						</view>
						
					</u-col>
					<u-col span="3">
						<view>
							{{item.gameAddress}}
						</view>
						<view class="" style="color: #999999; font-size: 26rpx;">
							{{ gameType(item) }}
						</view>
					</u-col>
				</u-row>
			</view>
		</template>
		
		<view class="no-data" v-if="!matchList.length">
			<image src="../static/no-data.png" mode=""></image>
			<span style="margin-top: 20rpx;">暂无比赛数据</span>
		</view>
	</view>
</template>

<script>
	import http from '../../api/index.js'
	import { mapGetters } from 'vuex'
	import moment from 'moment'
	export default {
		data() {
			return {
				matchList: []
			}
		},
		computed: {
			...mapGetters([
			  'userInfo',
			]),
			gameType() {
				return (order) => {
					if(order.gameType === 0) {
						return '全场'
					}else if(order.gameType === 1) {
						return '半场'
					}else{
						return ''
					}
				}
			}
		 },
		mounted() {
			http.get('weapp/enteredList', { params: { openId: this.userInfo.openId } }).then(res => {
				if(res.data.code === 0) {
					this.matchList = res.data.data
				}
			})
		},
		methods: {
			moment
		}
	}
</script>

<style lang="scss">
// .match-card{
// 	.team-score-item{
// 		font-size: 34rpx;
// 	}
// }
.match-item{
	padding: 24rpx 20rpx;
	margin-bottom: 20rpx;
	background-color: #FFFFFF;
}
.no-data{
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	// font-size: 36rpx;
	height: 100vh;
	width: 100vw;
	// background: url(../static/no-data.png);
	// background-size: contain;
	// background-repeat: no-repeat;
}
</style>
