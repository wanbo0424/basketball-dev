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
				},
				isPaying: false
			}
		},
		computed: {
			...mapGetters([
			  'userInfo',
			])
		},
		watch:{
			isPaying(val) {
				if(val) {
					uni.navigateTo({
						url: `/pages/payStatus/index?out_trade_no=${this.orderInfo.out_trade_no}`
					})
				}
			}
		},
		
		onLoad: function({gameDate, gameAddress, out_trade_no}){
			this.orderInfo.gameDate = gameDate
			this.orderInfo.gameAddress = gameAddress
			this.orderInfo.out_trade_no = out_trade_no
		},
		methods: {
			bindPay() { 
				// uni.navigateTo({
				// 	url: `/pages/pay/index?out_trade_no=${this.orderInfo.out_trade_no}&toPaied=true`
				// })
				this.confirmGator()
			},
			confirmGator() {
				// this.showPayModal = true
				let orderData = {
					mchid: '6c651e680f7b4eda9050259dc38ffe48',
					total_fee: 1,
					out_trade_no: this.orderInfo.out_trade_no,
					body: '报名预交金',
					notify_url: 'http://39.101.161.231/weapp/prepaidCb',
					nonce_str: getRandomNumber(),
				}
				let orderParams = {
					...orderData,
					sign: getSign(orderData)
				}
				uni.navigateToMiniProgram({
					appId: 'wx2574b5c5ee8da56b',
					path: 'pages/cashier/cashier',
					extraData: orderParams,
					// envVersion: '',
					success: r => {
					  console.log('跳转到 xunhupay 小程序成功', r)
					  // 成功跳转：标记支付中状态
					  this.isPaying = true
					},
					fail: e => {
					  // 跳转失败：弹出提示组件引导用户跳转
					  console.log('跳转到 xunhupay 小程序失败 - 准备弹窗提醒跳转', e)
					  this.isPaying = false
					}
				})
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
