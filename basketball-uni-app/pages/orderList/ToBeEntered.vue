<template>
	<view>
		<view class="order-item" v-for="(order, index) in orders">
			<view>比赛时间：{{order.time}}</view>
			<view>比赛地点：{{order.gameAddress}}</view>
			<view>球衣号码：{{order.Number}}</view>
			<view>所在队伍：{{order.team}}</view>
			<view>球衣颜色：{{order.yanse}}</view>
			<view>所在赛段：{{order.saiduan}}</view>
		</view>
	</view>
</template>

<script>
	export default {
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
	background-color: #FFFFFF;
	opacity: 0.9;
	border-radius: 26rpx;
	height: 280rpx;
	padding: 28rpx 24rpx;
	margin-bottom: 16rpx;
}
</style>
