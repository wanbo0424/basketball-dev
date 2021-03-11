<template>
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
						transform: rotate(28deg);" src="../../../static/imgs/rank/crown.png" mode=""></image>
				</view>
				<span style="display: inline-block;margin-top: 10rpx;">{{tableData[0].nickName}}</span>
				<span style="display: inline-block;margin-top: 10rpx;">积分:908</span>
				<!-- <image style="width: 70rpx;height: 70rpx;" src="../../../static/imgs/rank/top2.png" mode=""></image> -->
			</view>
			<view class="right_area">
				<ul style="height: 100%;">
					<li class="rank-item" v-for="(item, index) in goldList">
						<view class="rank-item-content">
							<image style="width: 50rpx;height: 50rpx;transform: scale(1);margin-top: 9rpx;" :src="item.medalUrl" mode=""></image>
							<image style="width: 60rpx;height: 60rpx;margin-left: 10rpx;" :src="userInfo.avatarUrl" mode=""></image>
							<view class="" style="display: flex;flex-direction: column;">
								<span style="font-size: 22rpx;margin-left: 20rpx;">{{tableData[0].nickName}}</span>
								<view class="">
									<span style="font-size: 22rpx;margin-left: 20rpx;">积分:362</span>
									<span style="font-size: 22rpx;margin-left: 20rpx;">胜率:72.6%</span>
								</view>
							</view>
							
							
						</view>
					</li>
					<a style="float: right;">查看详情</a>
					<!-- <image height="50" src="../../../static/imgs/rank/detail.png" mode=""></image> -->
				</ul>
			</view>
			<!-- <image style="float: right;" src="../../../static/imgs/rank/detail.png"></image> -->
		<!-- </view> -->
		<!-- <u-row >
			<u-col span="3">
				<view class="flex-center demo-layout bg-purple bg-purple-dark">排名</view>
			</u-col>
			<u-col span="3">
				<view class="flex-center demo-layout bg-purple-dark">昵称</view>
			</u-col>
			<u-col span="3">
				<view class="flex-center demo-layout bg-purple-dark">个人得分</view>
			</u-col>
			<u-col span="3">
				<view class="flex-center demo-layout bg-purple-dark">积分</view>
			</u-col>
		</u-row>
		<u-row v-for="(item, index) in tableData" >
			<u-col span="3">
				<view class="flex-center demo-layout bg-purple-light">{{index + 1}}</view>
			</u-col>
			<u-col span="3">
				<view class="flex-center demo-layout bg-purple-light">{{item.nickName}}</view>
			</u-col>
			<u-col span="3">
				<view class="flex-center demo-layout bg-purple-light">{{item.personScoreTotal}}</view>
			</u-col>
			<u-col span="3">
				<view class="flex-center demo-layout bg-purple-light">{{item.evaluationScoreTotal}}</view>
			</u-col>
		</u-row> -->
	</view>
</template>

<script>
	import http from '../../../api/index.js'
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				tableData: [],
				goldList: [
					{nickName: '1111', score: 432, rank: 1, medalUrl: '/static/imgs/rank/champion200.png'},
					{nickName: '1111', score: 286, rank: 2, medalUrl: '/static/imgs/rank/second200.png'},
					{nickName: '1111', score: 256, rank: 3, medalUrl: '/static/imgs/rank/third200.png'},
					// {nickName: '1111', score: 256, rank: 4, medalUrl: '/static/imgs/rank/surplus200.png'},
					// {nickName: '1111', score: 256, rank: 5, medalUrl: '/static/imgs/rank/surplus200.png'},
					// {nickName: '1111', score: 156, rank: 4, medalUrl: '../../../static/imgs/rank/4 5.png'},
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
				http.get('weapp/player/getPlayerRank').then(res => {
					if(res.data.code === 0) {
						this.tableData = res.data.data
						// this.goldList = this.tableData.split(0, 5)
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
