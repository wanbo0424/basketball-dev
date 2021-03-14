<template>
	<!-- <view> -->
		<view class="collect-toast" v-if="showColToast">
			<span class="text">点击这里收藏小程序</span>
			<span @click="showColToast = false" style="color: #FFFFFF;padding: 0 10rpx;">×</span>
		</view>
	<!-- </view> -->
</template>

<script>
	export default {
		data() {
			return {
				showColToast: true
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped> 
.collect-toast{
	z-index: 10;
	position: absolute;
	top: 28rpx;
	right: 20rpx;
	height: 50rpx;
	width: 286rpx;
	background-color: rgba(0, 0 ,0, 0.65);
	color: #fff;
	font-size: 24rpx;
	line-height: 50rpx;
	padding-left: 16rpx;
	&::before{
		position: absolute;
		top: -40rpx;
		left: 130rpx;
		content: '';
		width: 0;
		height: 0;
		border: 20rpx solid;
		border-color: transparent transparent rgba(0, 0 ,0, 0.65);
	}
	.text{
		display: inline-block;
		padding-right: 10rpx;
		border-right: 2rpx solid #FFFFFF;
	}
}
</style>
