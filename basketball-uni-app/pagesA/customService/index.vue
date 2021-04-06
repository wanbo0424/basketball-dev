<template>
	<view class="rank-model">
		<view class="contact">
			<view class="" style="padding: 10rpx;">
				如需帮助请添加下方客服微信，在线时间9:00--21:00
			</view>
			<image @click="previewImage" style="width: 500rpx;height: 500rpx;" :src="`${apuDomain}images/weixin_contact.jpg`" mode=""></image>
			<view style="text-align: center;padding-bottom: 10rpx;">点击保存二维码</view>
		</view>
		<view class="close-btn" @click="show = false">×</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				apuDomain: this.$apuDomain,
				show: false
			}
		},
		methods: {
			previewImage() {
				uni.previewImage({
					urls: [`${this.apuDomain}images/weixin_contact.jpg`],
					longPressActions: {
						itemList: ['保存相册', '识别二维码']
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.rank-model{
	height: 100vh;
	width: 100vw;
}
.rank-model:after{
	content: '';
	display: block;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-image: url(/static/imgs/order-bg.jpg);
	opacity: 0.5;
	background-size: cover;
	background-repeat:no-repeat;
}
.contact-model{
	display: flex;
	justify-content: center;
	align-items: center;
}
.contact{
	z-index: 10;
	width: 70%;
	background-color: #FFFFFF;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
}
.close-btn{
	width: 80rpx;
	height: 80rpx;
	line-height: 70rpx;
	border: 2rpx solid #FFFFFF;
	border-radius: 50%;
	color: #FFFFFF;
	margin: 0 auto;
	position: relative;
	bottom: -92rpx;
	font-size: 60rpx;
}
</style>
