<template>
	<view class="pay_page">
		<view class="order_info cell_info">
			<h2>比赛地点：{{orderInfo.gameAddress}}</h2>
			<h2>比赛时间：{{orderInfo.gameDate}} {{orderInfo.gameTimeRange}}</h2>
			<h2>比赛类型：{{orderInfo.gameType === 0 ? '全场' : '半场'}}</h2>
			<!-- <view>
				{{orderInfo.gameDate}}
			</view> -->
		</view>
		
		<view class="pay_info cell_info">
			<view class="pay_item">
				<span>总金额</span>
				<span>¥{{orderInfo.totalAmount}}</span>
			</view>
			<!-- v-if="couponList.length" -->
			<!-- v-if="couponInfo.couponType === 0" -->
			<view class="pay_item coupon" v-if="couponList.length" @click="showCouponList = true">
				<template v-if="couponInfo.couponType === 0">
					<span>折扣券</span>
					<span>
						<u-icon name="youhuiquan1" custom-prefix="custom-icon" color="red" style="padding-right: 12rpx;"></u-icon>
						{{couponInfo.allowance}}折
						<span style="padding-left: 14rpx;">></span>
					</span>
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
		
		<u-modal v-model="showPaid" :content="payContent" @confirm="backToIntroduce" height="250">
			<template v-if="showCoupon">
				<div style="text-align: center;">
					<image style="height: 240rpx;width: 424rpx;" src="../static/coupon.png" mode=""></image>
				</div>
				<div style="padding: 0 24rpx;" v-if="gameType === 0">
					<!-- 恭喜您获得新人折扣券，请在优惠券中查看。(弹出优惠券图片) -->
					组队成功后会发送短信和微信通知比赛时间地点以及所属队伍和球衣号码颜色（球衣由组织方提供）。请带好球鞋及防护装备准时到达场地参赛！
				</div>
				<div style="padding: 0 24rpx;" v-if="gameType === 1">
					支付成功，组队成功后会发送短信和微信通知，请准时到场，祝您有个好的体验！
				</div>
			</template>
			<template v-else>
				<div style="padding: 0 24rpx;" v-if="gameType === 0">
					支付成功，组队成功后会发送短信和微信通知比赛时间地点以及所属队伍和球衣号码颜色（球衣由组织方提供）。请带好球鞋及防护装备准时到达场地参赛！
				</div>
				<div v-if="gameType === 1" style="padding: 0 24rpx;" >
					支付成功，组队成功后会发送短信和微信通知，请准时到场，祝您有个好的体验！
				</div>
			</template>
		</u-modal>
		
		<u-popup v-model="showCouponList" mode="bottom">
			<view class="" style="font-size: 36rpx; text-align: center;padding-top: 12rpx;">
				优惠券
			</view>
			<view style="padding: 24rpx 18rpx;margin-bottom: 50px;">
				<u-radio-group v-model="selectedCoupon">
					<view class="coupon-item" v-for="(coupon, index) in couponList">
						<view class="coupon-price">
							<view class="" style="font-size: 44rpx;font-weight: 600;">
								<template v-if="coupon.couponType === 0">
									{{coupon.allowance}}折
								</template>
								<template v-else>
									{{coupon.allowance}}元
								</template>
							</view>
							<view class="">
								{{coupon.couponType === 0 ? '折扣券' : '代金券'}}
							</view>
						</view>
						<view class="coupon-content">
							<view class="" style="font-size: 26rpx;">
								{{coupon.name}}
							</view>
							<view class="" style="color: #f96d0a;padding-left: 10rpx;">
								不限期
							</view>
						</view>
						<view class="coupon-btn">
							<u-radio :name="coupon._id">
							</u-radio>
						</view>
					</view>
				</u-radio-group>
			</view>
			<view class="" style="height: 80rpx;position: fixed;width: 100%; bottom: 0;">
				<button style="
					background: #f96d0a;
					color: #fff;
					height: 50rpx;
					line-height: 50rpx;
					font-size: 28rpx;
					border-radius: 28rpx;
					width: 170rpx;"
					@click="selectCoupon"
				>
					立即使用
				</button>
			</view>
		</u-popup>
		
		<coupon-model v-model="showCouponIcon"></coupon-model>
	</view>
</template>
<script>
import {generateOrderNumber, getRandomNumber, getSign} from '../../utils/payUtils.js'
import http from '../../api/index.js'
import { mapGetters } from 'vuex'
import CouponModel from './CouponModel.vue'
	export default {
		components:{ CouponModel },
		data() {
			return {
				orderInfo: {
					gameDate: '',
					gameAddress: '',
					gameType: null,
					totalAmount: 100 ,//订单总金额
					// defray: 50 //预交金
				},
				isPaying: false,
				paySuccess: false,
				showPaid: false,
				showCoupon: false,
				showCouponList: false,
				showCouponIcon: false,  //显示优惠券画像
				selectedCoupon: '',
				payContent: '支付成功，组队成功后会发送短信和微信通知比赛时间地点。请准时到达场地参赛！',
				couponInfo: {
					couponType: 0
				},
				discountPrice: 0,
				couponList: [{
					couponType: 0,
					allowance: 9
				}],
				gameType: null
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
						this.orderInfo.totalAmount = (this.couponInfo.allowance / 10) * this.gamePrice
						this.discountPrice = this.gamePrice - this.orderInfo.totalAmount - (this.couponInfo.allowance / 10) * this.gamePrice
					}
				},
				deep: true,
				immediate: true
			}
		},
		
		onLoad: async function({gameDate, gameAddress, out_trade_no, gameTimeRange, couponListm, gameType, price}){
			await this.getCoupons()
			this.orderInfo.out_trade_no = out_trade_no
			this.orderInfo.gameDate = gameDate
			this.orderInfo.gameAddress = gameAddress
			this.orderInfo.gameTimeRange = gameTimeRange
			this.orderInfo.totalAmount = price
			this.$set(this.orderInfo, 'gameType', +gameType)
			this.gameType = +gameType
			this.gamePrice = price
		},
		mounted() {
			wx.onAppShow(appOptions => {
				if(!this.isPaying) return
				
				this.isPaying = false
				if (appOptions.scene === 1038 && appOptions.referrerInfo.appId === 'wx2574b5c5ee8da56b') {
				  // 来源于 xunhupay 小程序返回
				  console.log('确认来源于 xunhupay 回调返回')
				  let extraData = appOptions.referrerInfo.extraData
				  if (extraData.paySuccess) {
					this.paySuccess = true
					if(appOptions.query.out_trade_no) {
						this.gameType = +appOptions.query.gameType
						// 如果是第一次参加通知发放新人优惠券
						http.get('weapp/allOrderList', {openId: this.userInfo.openId}).then(res => {
							if(res.data.code === 0) {
								if(res.data.data.length === 1) {
									this.showCoupon = true
								}
								this.showPaid = true
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
				if(this.showCouponIcon && this.gameType === 0) {
					//弹出优惠券画像，用户自主领取
					this.showCouponIcon = true
				}
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
				return http.get('weapp/player/getCouponList', {params: {openId: this.userInfo.openId}}).then(res => {
					if(res.data.code === 0) {
						this.couponList = res.data.data
						if(res.data.data.length) {
							this.couponInfo = res.data.data[0]
							this.selectedCoupon = this.couponInfo._id
						}
					}
				})
			},
			selectCoupon() {
				this.couponInfo = this.couponList.find(item => item._id === this.selectedCoupon)
				this.showCouponList = false
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
.coupon-item{
	display: flex;
	align-items: center;
	padding: 20rpx 50rpx;
	height: 126rpx;
	border-radius: 26rpx;
	background-color: #dcdcdc;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.2);
	margin-bottom: 22rpx;
	.coupon-price{
		width: 20%;
		color: #f96d0a;
	}
	.coupon-content{
		width: 50%;
	}
	.coupon-btn{
		width: 30%;
	}
}
</style>
