<template>
	<view>
		<view class="order-item" v-for="(order, index) in orders">
			<view>比赛时间：{{order.time}}</view>
			<view>比赛地点：{{order.gameAddress}}</view>
			<view>球衣号码：{{order.team}}</view>
			<view>所在队伍：{{order.Number}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orders: [
					{time: '2021-05-01 16:00', gameAddress: '延平门', team: 'A队', Number: 8},
					{time: '2021-05-07 16:00', gameAddress: '洛克球馆', team: 'B队', Number: 6},
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.order-item{
	background-color: #FFFFFF;
	opacity: 0.9;
	border-radius: 26rpx;
	height: 300rpx;
	padding: 28rpx 24rpx;
	margin-bottom: 16rpx;
}
</style>
