<template>
	<view class="coupon-list">
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
				<button style="
					background: #f96d0a;
					color: #fff;
					height: 50rpx;
					line-height: 50rpx;
					font-size: 28rpx;
					border-radius: 28rpx;
					width: 170rpx;"
					@click="toUseCoupon"
				>
					立即使用
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import http from '../../api/index.js'
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				couponList: [
					{price: '9折', description: '新人使用'}
				]
			}
		},
		computed: {
			...mapGetters([
			  'userInfo',
			])
		 },
		mounted() {
			this.getCouponList()
		},
		methods: {
			getCouponList() {
				http.get('weapp/player/getCouponList', { params: { openId: this.userInfo.openId } }).then(res => {
					if(res.data.code === 0) {
						this.couponList = res.data.data
					}
				})
			},
			toUseCoupon() {
				uni.navigateTo({
					url:'/pagesA/messageForm/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.coupon-list{
	padding: 20rpx 36rpx;
	background-color: rgba(249, 109, 10, 0.43);
	height: 100vh;
}
.coupon-item{
	display: flex;
	align-items: center;
	padding: 50rpx 50rpx;
	height: 260rpx;
	border-radius: 26rpx;
	background-color: #FFFFFF;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.2);
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
