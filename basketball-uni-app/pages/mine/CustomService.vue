<template>
	<!-- <u-modal v-model="show" :show-cancel-button="true" :show-confirm-button="false" 
		title="客服联系方式" @cancel="cancel" @confirm="confirm"
	>
		<view class="u-update-content">
			<image @click="previewImage" style="width: 100%;" :src="`${apuDomain}images/weixin_contact.jpg`" mode=""></image>
			<view style="text-align: center;">点击保存二维码</view>
		</view>
	</u-modal> -->
	<view v-if="show" class="rank-model">
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
@import '../../common/common.scss';
.contact-model{
	display: flex;
	justify-content: center;
	align-items: center;
}
.contact{
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
