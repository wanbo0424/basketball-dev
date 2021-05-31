<template>
	<view class="">
		<view class="wrap">
			<!-- <view class="matte"> -->
				<view class="left_area">
					<image style="height: 100rpx;width: 140rpx;position: absolute;top: 0;left: 0;" src="../../../static/imgs/rank/rank.png" mode=""></image>	
					<view style="display: flex;margin-top: 84rpx;position: relative;">
						<image 
						style="width: 116rpx;height: 116rpx;border: 1px solid #2C405A;border-radius: 12rpx" 
						:src="userInfo.avatarUrl" alt="头像" mode=""></image>
						<image style="width: 104rpx;
							height: 40rpx;
							position: absolute;
							right: -38rpx;
							top: -26rpx;
							transform: rotate(28deg);" src="../../../static/imgs/rank/crown.png" mode="">
						</image>
					</view>
					<span style="display: inline-block;margin-top: 10rpx;">{{tableData[0].nickName || '？？'}}</span>
					<span style="display: inline-block;margin-top: 10rpx;">积分:{{tableData[0].evaluationScoreTotal || 0}}</span>
					<!-- <image style="width: 70rpx;height: 70rpx;" src="../../../static/imgs/rank/top2.png" mode=""></image> -->
				</view>
				<view class="right_area">
					<ul style="height: 100%;">
						<li class="rank-item" v-for="(item, index) in goldList">
							<view class="rank-item-content">
								<image style="width: 50rpx;height: 50rpx;transform: scale(1);margin-top: 9rpx;" :src="item.medalUrl" mode=""></image>
								<image style="width: 60rpx;height: 60rpx;margin-left: 10rpx;" :src="item.avatarUrl" mode=""></image>
								<view class="" style="display: flex;flex-direction: column;">
									<span style="font-size: 22rpx;margin-left: 20rpx;">{{ item.nickName || '？？' }}</span>
									<view class="">
										<span style="font-size: 22rpx;margin-left: 20rpx;">积分: {{item.evaluationScoreTotal}}</span>
										<span style="font-size: 22rpx;margin-left: 20rpx;">胜率: {{item.winRate}} %</span>
									</view>
								</view>
							</view>
						</li>
						<span 
							style="color: #fbf8f4;
							text-shadow: 0 0 2rpx red, 0 0 2rpx red, 0 0 10rpx red, 0 0 10rpx red;
							float: right;
							margin-top: 6rpx;"
							@click="$refs.rankDetail.init(tableData)"
							>
							查看详情
						</span>
					</ul>
				</view>
		</view>
		<rank-detail :tableData="tableData" ref="rankDetail"></rank-detail>
	</view>
</template>

<script>
	import http from '../../../api/index.js'
	import RankDetail from './RankDetail'
	import { mapGetters } from 'vuex'
	export default {
		components:{ RankDetail },
		data() {
			return {
				tableData: [],
				medalUrls: ['/static/imgs/rank/champion200.png', '/static/imgs/rank/second200.png', '/static/imgs/rank/third200.png'],
				goldList: [
					// {nickName: '1111', score: 432, rank: 1, medalUrl: '/static/imgs/rank/champion200.png'},
					// {nickName: '1111', score: 286, rank: 2, medalUrl: '/static/imgs/rank/second200.png'},
					// {nickName: '1111', score: 256, rank: 3, medalUrl: '/static/imgs/rank/third200.png'},
				],
				ctx: null
			}
		},
		computed: {
			...mapGetters([
			  'userInfo',
			])
		 },
		methods: {
			loadData() {
				http.get('weapp/playerCareer/getAllCareerList').then(res => {
					if(res.data.code === 0) {
						res.data.data.forEach(item => {
							let winCount = 0
							item.evaluationScoreTotal = item.careerGames.map(item => item.evaluationScore || 0).reduce((total, num) => total + num)
							item.careerGames.forEach(ele => {
								if((ele.team === 'A' && ele.ATeamScore > ele.BTeamScore) || (ele.team === 'B' && ele.BTeamScore > ele.ATeamScore)) {
									winCount += 1
								}
							})
							item.winRate = ((winCount / item.careerGames.length) * 100).toFixed(2)
						})
						this.tableData = res.data.data.sort((a, b) => a.evaluationScoreTotal > b.evaluationScoreTotal)
						this.tableData.forEach((item, index) => {
							item.rank = index + 1
						})
						this.goldList = this.tableData.slice(0, 3)
						this.medalUrls.forEach((item, index) => {
							if(this.goldList[index]) {
								this.goldList[index].medalUrl = item
							}
						})
					}
				})
			},
			
		},
		mounted() {
			this.loadData()
			
		}
	}
</script>

<style lang="scss" scoped>
.flex-center{
	display: flex;
	justify-content: center;
	align-items: center;
}
.wrap{
	// text-align: center;
	margin-top: 28rpx;
	width: '100%';
	height: 340rpx;
	display: flex;
	position:relative;
	padding: 12rpx;
	// background-image: linear-gradient(#e69874, #e5c471); 
	// background: hsla(0, 0%, 100%, 0);
	background-color: #FFFFFF;
	// box-shadow: 
				// 0 0 0 1px hsla(0,0%,100%,.3) inset,
	            // 0 4rpx 12rpx rgba(0, 0, 0, 0.6);
		// &::before{
		// 	content: '';
		// 	position: absolute;
		// 	top: 0;
		// 	right: 0;
		// 	left: 0;
		// 	bottom: 0;
		// 	background: hsla(0, 0%, 100%, .6);
		// 	border-radius: 26rpx;
		// 	filter: blur(8px);
		// 	overflow: hidden
		// }
		.left_area{
			height: 100%;
			width: 40%;
			padding: 10rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-right: 2rpx solid #efe9e8;
		}
		.right_area{
			height: 100%;
			width: 60%;
			.rank-item{
				padding: 8rpx;
				height: 30%;
				width: 100%;
				margin-bottom: 1%;
				// background-color: #efe9e8;
				box-shadow:0 0 0 1px hsla(0,0%,100%,.3) inset,
				           0 4rpx 12rpx rgba(0, 0, 0, 0.3);
				.rank-item-content{
					height: 100%;
					display: flex;
					align-items: center
				}
			}
		}
}
.demo-layout {
	height: 40rpx;
	border-radius: 8rpx;
}
.bg-purple-light {
	background: #e5e9f2;
}
.bg-purple-dark {
	background: #99a9bf;
}
</style>
