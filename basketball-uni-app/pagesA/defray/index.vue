<template>
	<view class="pay_page">
		<view class="order_info cell_info">
			<h2>比赛地点：{{orderInfo.gameAddress}}</h2>
			<h2>比赛时间：{{orderInfo.gameDate}} {{orderInfo.gameTimeRange}}</h2>
			<!-- <view>
				{{orderInfo.gameDate}}
			</view> -->
		</view>
		
		<view class="pay_info cell_info">
			<view class="pay_item">
				<span>总金额</span>
				<span>¥{{orderInfo.totalAmount}}</span>
			</view>
			<!-- <view class="pay_item">
				<span>预交金</span>
				<span>¥{{orderInfo.defray}}</span>
			</view> -->
			<view class="pay_item coupon">
				<template v-if="couponInfo.couponType === 0">
					<span>折扣券</span>
					<span style="font-size: 40rpx;" >{{couponInfo.allowance}}折</span>
				</template>
			</view>
		</view>
		
		<view class="checkout_counter">
			<view class="amount">
				<span>¥</span>
				<span style="font-size: 40rpx;">{{orderInfo.totalAmount}}</span>
			</view>
			<view class="bindPay_button" @click="bindPay">
				去支付
			</view>
		</view>
		
		<u-modal v-model="showPaid" :content="payContent" @confirm="backToIntroduce"></u-modal>
		<!-- <u-modal v-model="showCoupon" :content="'恭喜您获得新人折扣券，请在优惠券中查看'" @confirm="backToIntroduce"></u-modal> -->
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
					// defray: 50 //预交金
				},
				isPaying: false,
				paySuccess: false,
				showPaid: false,
				showCoupon: false,
				payContent: '支付成功，组队成功后会发送短信和微信通知比赛时间地点。请准时到达场地参赛！',
				couponInfo: {
					couponType: ''
				},
				discountPrice: 0
			}
		},
		computed: {
			...mapGetters([
			  'userInfo',
			])
		},
		watch:{
			// paySuccess(val) {
			// 	if(val) {
			// 		this.showPaid = true
			// 	}
			// },
			couponInfo: {
				handler(val) {
					if(val && val.couponType === 0) {
						this.orderInfo.totalAmount = (this.couponInfo.allowance / 10) * 100
						this.discountPrice = 100 - this.orderInfo.totalAmount - (this.couponInfo.allowance / 10) * 100
					}
				},
				deep: true,
				immediate: true
			}
		},
		
		onLoad: function({gameDate, gameAddress, out_trade_no, gameTimeRange}){
			this.orderInfo.out_trade_no = out_trade_no
			this.orderInfo.gameDate = gameDate
			this.orderInfo.gameAddress = gameAddress
			this.orderInfo.gameTimeRange = gameTimeRange
		},
		mounted() {
			this.getCoupons()
			wx.onAppShow(appOptions => {
				if(!this.isPaying) return
				
				this.isPaying = false
				if (appOptions.scene === 1038 && appOptions.referrerInfo.appId === 'wx2574b5c5ee8da56b') {
				  // 来源于 xunhupay 小程序返回
				  console.log('确认来源于 xunhupay 回调返回')
				  let extraData = appOptions.referrerInfo.extraData
				  console.log('extraData', extraData)
				  if (extraData.paySuccess) {
					this.paySuccess = true
					if(appOptions.query.out_trade_no) {
						// 如果是第一次参加通知发放新人优惠券
						http.get('weapp/allOrderList', {openId: this.userInfo.openId}).then(res => {
							if(res.data.code === 0) {
								if(res.data.data.length === 1) {
									this.payContent = `恭喜您获得新人折扣券，请在优惠券中查看${this.payContent}。组队成功后会发送短信和微信通知比赛时间地点。请准时到达场地参赛！`
									this.showPaid = true
								}
							}
						})
					}
				  } else {
					this.paySuccess = false
					this.payContent = '支付失败，请重新支付'
					this.showPaid = true
				  }
				}
			})
		},
		methods: {
			backToIntroduce() {
				if(!this.paySuccess) return
				uni.navigateBack({
					delta: 2
				})
			},
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
					notify_url: 'https://www.apusport.cn/weapp/prepaidCb',
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
			},
			getCoupons() {
				http.get('weapp/player/getCouponList', {params: {openId: this.userInfo.openId}}).then(res => {
					if(res.data.code === 0) {
						this.couponInfo = res.data.data[0]
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
	line-height: 50rpx;
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
