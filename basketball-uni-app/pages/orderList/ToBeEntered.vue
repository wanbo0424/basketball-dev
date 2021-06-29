<template>
	<view>
		<view class="order-item" v-for="(order, index) in orders" @click="getTicket(order)">
			<view class="">
				<view>比赛时间：{{order.gameDate}} {{order.gameTimeRange}}</view>
				<!-- <view>比赛地点：{{order.gameAddress}}</view> -->
				<view>所在队伍：{{order.team || ''}}</view>
				<view>比赛类型：{{gameType(order)}}</view>
				<view>球衣颜色：{{order.jerseyColor || ''}}</view>
				<view>球衣号码：{{order.jerseyNumber || ''}}</view>
				<view>所在赛段：{{order.stage || ''}}</view>
			</view>
			<view class="address-item" @click="createMap(order)">
				<image src="../../static/imgs/Marker.png" mode="" 
					style="display: inline-block;height: 32rpx;width: 32rpx;vertical-align: middle;">
				</image>
				<span>比赛地点：{{order.gameAddress}}</span>
				<span style="float:right">></span>
			</view>
			<image v-if="order.team && order.gameStatus === 0" style="position: absolute;right: 32rpx;top: 110rpx;height: 140rpx;width: 140rpx;opacity: 0.7;" src="../../static/imgs/participate.png" mode=""></image>
			<image v-if="!order.team && order.gameStatus === 0" style="position: absolute;right: 32rpx;top: 110rpx;height: 140rpx;width: 140rpx;opacity: 0.7;" src="../../static/imgs/matching.png" mode=""></image>
			<!-- <image v-if="order.team && order.gameStatus === 2 " style="position: absolute;right: 32rpx;top: 110rpx;height: 140rpx;width: 140rpx;opacity: 0.7;" src="../../static/imgs/participated.png" mode=""></image> -->
			<image v-if="order.team && order.gameStatus === 2" style="position: absolute;right: 32rpx;top: 110rpx;height: 140rpx;width: 140rpx;opacity: 0.7;" src="../../static/imgs/participated.png" mode=""></image>
			<!-- <view class="btn">
				<button @click="$refs.contact.show = true">退款</button>
			</view> -->
		</view>
		<!-- <map id="map1" v-if="showMap"></map> -->
	</view>
</template>

<script>
	import moment from 'moment'
	export default {
		props: {
			data: {
				type: Array,
				default: []
			},
			swiperCurrent: {
				type: Number,
			}
		},
		watch: {
			'data'(val) {
				this.orders = val
			}
		},
		computed:{
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
		data() {
			return {
				orders: [],
				Mapcontext: null,
				showMap: false
			}
		},
		
		mounted() {
			// this.getToEnteredList()
		},
		methods: {
			createMap(order) {
				this.showMap = true
				// this.Mapcontext = wx.createMapContext('map1', this)
				wx.openLocation({
					latitude: order.latitude,
					longitude: order.longitude
				})
			},
			getTicket(order) {
				if(!order.team) return
				if(this.swiperCurrent === 0) {
					let month = (new Date(order.gameDate).getMonth() + 1).toString().padStart(2, '0')
					let date = new Date(order.gameDate).getDate()
					let team = order.team || ''
					let gameAddress = order.gameAddress || ''
					let jerseyNumber = order.jerseyNumber || ''
					let jerseyColor = order.jerseyColor || ''
					let hour = moment(order.gameDate).format('HH')
					let minute = moment(order.gameDate).format('mm')
					uni.navigateTo({
						url: `/pages/canvas/AdmissionTicket?month=${month}&date=${date}&hour=${hour}&minute=${minute}&team=${team}&gameAddress=${gameAddress}&jerseyColor=${jerseyColor}&&jerseyNumber=${jerseyNumber}`
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.order-item{
	position: relative;
	display: flex;
	flex-direction: column;
	background-color: #FFFFFF;
	opacity: 0.9;
	border-radius: 26rpx;
	// height: 280rpx;
	padding: 28rpx 24rpx 0 24rpx;
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
	.address-item{ 
		border-top: 2rpx solid #878787;
		// height: 40rpx;
		// line-height: 40rpx;
		padding: 8rpx 0;
		margin-top: 10rpx;
	}
}
</style>
