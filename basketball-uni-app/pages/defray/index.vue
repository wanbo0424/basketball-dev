<template>
	<view class="pay_page">
		<view class="order_info cell_info">
			<h2>{{orderInfo.gameAddress}}</h2>
			<view>
				{{orderInfo.gameDate}}
			</view>
		</view>
		
		<view class="pay_info cell_info">
			<view class="pay_item">
				<span>总金额</span>
				<span>¥{{orderInfo.totalAmount}}</span>
			</view>
			<view class="pay_item">
				<span>预交金</span>
				<span>¥{{orderInfo.defray}}</span>
			</view>
		</view>
		
		<view class="checkout_counter">
			<view class="amount">
				<span>¥</span>
				<span style="font-size: 40rpx;">{{orderInfo.defray}}</span>
			</view>
			<view class="bindPay_button" @click="bindPay">
				去支付
			</view>
		</view>
		<!-- <button type="default" @click="bindPay">去支付</button> -->
	</view>
</template>
<script>
import {generateOrderNumber, getRandomNumber, getSign} from '../../utils/payUtils.js'
import http from '../../api/index.js'
import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				orderInfo: {
					gameDate: '',
					gameAddress: '',
					totalAmount: 100 ,//订单总金额
					defray: 50 //预交金
				}
			}
		},
		computed: {
			...mapGetters([
			  'userInfo',
			])
		},
		onLoad: function({gameDate, gameAddress, out_trade_no}){
			this.orderInfo.gameDate = gameDate
			this.orderInfo.gameAddress = gameAddress
			this.orderInfo.out_trade_no = out_trade_no
		},
		methods: {
			bindPay() { 
				uni.navigateTo({
					url: `/pages/pay/index?out_trade_no=${this.orderInfo.out_trade_no}`
				})
				// let orderData = {
				// 	mchid: '6c651e680f7b4eda9050259dc38ffe48',
				// 	total_fee: 10,
				// 	out_trade_no: generateOrderNumber(),
				// 	body: '报名预交金',
				// 	notify_url: 'http://39.101.161.231/weapp/prepaidCb',
				// 	nonce_str: getRandomNumber(),
				// }
				// let orderParams = {
				// 	...orderData,
				// 	sign: getSign(orderData)
				// }
				// console.log('请求支付参数', orderParams)
				// http.post('weapp/prepaid', orderParams).then(res => {
				// 	if(res.code === 0) {
				// 	}
				// })
				// uni.request({
				// 	url: 'https://www.example.com/request', //仅为示例，并非真实接口地址。
				// 	data: orderParams,
				// 	header: {
				// 		'custom-header': 'hello' //自定义请求头信息
				// 	},
				// 	success: (res) => {
				// 		console.log(res.data);
				// 		this.text = 'request success';
				// 	}
				// })
			}
		}
	}
</script>

<style lang="scss" scoped>
.pay_page{
	padding: 0 40rpx 50rpx 40rpx;
	background-color: #F1F1F1;
	height: 100vh;
}
.cell_info{
	width: 100%;
	padding: 50rpx 15rpx;
	background-color: #fff;
	border-radius: 25rpx;
}
.order_info{ 
	
}
.pay_info{ 
	margin-top: 30rpx;
}
.pay_item{
	display: flex;
	justify-content: space-between;
}
.checkout_counter{
	position: fixed;
	bottom: 15rpx;
	background-color: #2C405A;
	border-radius: 45rpx;
	height: 78rpx;
	width: 90%;
	.amount{
		position: absolute;
		left: 20rpx;
		color: #fff;
		height: 78rpx;
		line-height: 78rpx;
	}
	.bindPay_button{ 
		position: absolute;
		text-align: center;
		right: 0;
		height: 78rpx;
		line-height: 78rpx;
		width: 160rpx;
		background-color: #F0AD4E;
		font-weight: 600;
		font-size: 35rpx;
		border-radius: 0 45rpx 45rpx 0;
	}
}
</style>
