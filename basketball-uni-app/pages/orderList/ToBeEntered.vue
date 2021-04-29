<template>
	<view>
		<view class="order-item" v-for="(order, index) in orders" @click="getTicket">
			<view class="">
				<view>比赛时间：{{order.gameDate}}</view>
				<view>比赛地点：{{order.gameAddress}}</view>
				<view>球衣号码：{{order.jerseyNumber}}</view>
				<view>所在队伍：{{order.team}}</view>
				<view>球衣颜色：{{order.jerseyColor}}</view>
				<view>所在赛段：{{order.saiduan}}</view>
			</view>
			
			<image style="position: absolute;right: 0;bottom: 0;height: 200rpx;width: 180rpx;" src="../../static/imgs/participate.png" mode=""></image>
			<!-- <view class="btn">
				<button @click="$refs.contact.show = true">退款</button>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			data: {
				type: Array,
				default: []
			}
		},
		watch: {
			'data'(val) {
				debugger
				this.orders = val
			}
		},
		data() {
			return {
				orders: []
			}
		},
		
		mounted() {
			// this.getToEnteredList()
		},
		methods: {
			getTicket() {
				uni.navigateTo({
					url: '/pages/canvas/AdmissionTicket'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.order-item{
	position: relative;
	display: flex;
	background-color: #FFFFFF;
	opacity: 0.9;
	border-radius: 26rpx;
	height: 280rpx;
	padding: 28rpx 24rpx;
	margin-bottom: 16rpx;
	.btn{
		display: flex;
		flex: 1;
		align-items: center;
		button{
			width: 100rpx;
			height: 40rpx;
			line-height: 40rpx;
			padding: 0 10rpx;
			font-size: 24rpx;
			color: #FFFFFF;
			background-color: red;
		}
	}
}
</style>
