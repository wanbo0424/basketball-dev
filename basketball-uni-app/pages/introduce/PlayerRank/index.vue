<template>
	<view class="wrap">
		<view class="left_area">
			<!-- <view class=""> -->
				<image style="width: 30%;height: 30%;" :src="tableData[0].avator" mode=""></image>
				<span>{{tableData[0].nickName}}</span>
			<!-- </view> -->
		</view>
		<view class="right_area">
			<ul>
				<li class="rank-item"></li>
			</ul>
		</view>
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
				tableData: []
			}
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

<style lang="scss" scoped>
.flex-center{
	display: flex;
	justify-content: center;
	align-items: center;
}
.wrap{
	// text-align: center;
	width: '100%';
	height: 475rpx;
	display: flex;
	margin-top: 24rpx;
	border: 2rpx solid #f57463;
	// background: rgba($color: #646464, $alpha: 0.6);
	.left_area{
		width: 50%;
		padding: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.right_area{
		width: 50%;
		padding: 12rpx;
		.rank-item{
			height: 58rpx;
			width: 100%;
			margin-bottom: 8rpx;
			background-color: #e5e5e5;
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
