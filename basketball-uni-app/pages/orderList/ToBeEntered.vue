<template>
	<view>
		<view class="order-item" v-for="(order, index) in orders">
			<view class="">
				<view>比赛时间：{{order.time}}</view>
				<view>比赛地点：{{order.gameAddress}}</view>
				<view>球衣号码：{{order.Number}}</view>
				<view>所在队伍：{{order.team}}</view>
				<view>球衣颜色：{{order.yanse}}</view>
				<view>所在赛段：{{order.saiduan}}</view>
			</view>
			<!-- <view class="btn">
				<button @click="$refs.contact.show = true">退款</button>
			</view> -->
		</view>
		
		<custom-service ref="contact"></custom-service>
	</view>
</template>

<script>
	import CustomService from '../mine/CustomService'
	export default {
		components:{CustomService},
		data() {
			return {
				orders: [
					{time: '2021-05-01 16:00', gameAddress: '延平门', team: 'A队', Number: 8, yanse: '蓝色', saiduan: '第一赛段'},
					{time: '2021-05-07 16:00', gameAddress: '洛克球馆', team: 'B队', Number: 6, yanse: '黄色', saiduan: '第二赛段'},
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.order-item{
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
