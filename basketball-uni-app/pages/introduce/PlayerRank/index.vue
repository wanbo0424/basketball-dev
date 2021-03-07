<template>
	<view class="wrap">
		<!-- <view class="matte"> -->
			<view class="left_area">
					<image style="width: 18rpx;height: 18rpx;" src="../../../static/imgs/rank/top2.png" mode=""></image>
					<image style="width: 140rpx;height: 140rpx;border: 1px solid #2C405A;" src="" alt="头像" mode=""></image>
					<span>{{tableData[0].nickName}}</span>
					<span>排位</span>
			</view>
			<view class="right_area">
				<ul style="height: 100%;">
					<li class="rank-item" v-for="(item, index) in goldList">
						<view class="rank-item-content">
							<image style="width: 40rpx;height: 40rpx;transform: scale(1);" :src="item.medalUrl" mode=""></image>
						</view>
					</li>
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
	export default {
		data() {
			return {
				tableData: [],
				goldList: [
					{nickName: '1111', score: 432, rank: 1, medalUrl: '/static/imgs/rank/champion200.png'},
					{nickName: '1111', score: 286, rank: 2, medalUrl: '/static/imgs/rank/second200.png'},
					{nickName: '1111', score: 256, rank: 3, medalUrl: '/static/imgs/rank/third200.png'},
					{nickName: '1111', score: 256, rank: 4, medalUrl: '/static/imgs/rank/surplus200.png'},
					{nickName: '1111', score: 256, rank: 5, medalUrl: '/static/imgs/rank/surplus200.png'},
					// {nickName: '1111', score: 156, rank: 4, medalUrl: '../../../static/imgs/rank/4 5.png'},
				],
				ctx: null
			}
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
	height: 360rpx;
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
				height: 20%;
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
