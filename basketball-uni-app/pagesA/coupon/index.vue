<template>
	<view class="coupon-list">
		<view class="coupon-item" v-for="(coupon, index) in couponList">
			<view class="coupon-price">
				<view class="" style="font-size: 44rpx;font-weight: 600;">
					{{coupon.price}}
				</view>
				<view class="">
					折扣券
				</view>
			</view>
			<view class="coupon-content">
				<view class="" style="font-size: 26rpx;">
					【首场】新人折扣券
				</view>
				<view class="" style="color: #f96d0a;padding-left: 10rpx;">
					不限期
				</view>
			</view>
			<view class="coupon-btn">
				<button style="background: #f96d0a;
					color: #fff;
					height: 50rpx;
					line-height: 50rpx;
					font-size: 28rpx;
					border-radius: 28rpx;
					width: 170rpx;"
					@click="uni.navigateTo({
						url:'/pagesA/order/index'
					})"
					>
					立即使用
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				couponList: [
					{price: '9折', description: '新人使用'}
				]
			}
		},
		methods: {
			
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
