<template>
	<view class="coupon-list">
		<view class="coupon-item" v-for="(coupon, index) in couponList">
			<view class="coupon-price">
				<view class="" style="font-size: 40rpx;">
					{{coupon.price}}
				</view>
				<view class="">
					折扣券
				</view>
			</view>
			<view class="coupon-content">
				<view class="" style="font-size: 32rpx;">
					【首场】新人折扣券
				</view>
				<view class="" style="color: #f96d0a;">
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
					width: 170rpx;">
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
					{price: '九折', description: '新人使用'}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.coupon-item{
	display: flex;
	align-items: center;
	padding: 50rpx 10rpx;
	height: 260rpx;
	background-color: rgba(243, 148, 124, 0.2);
	border-radius: 26rpx;
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
