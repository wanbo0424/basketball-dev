<template>
	<u-modal v-model="show" :show-cancel-button="true" :show-confirm-button="false" 
		title="客服联系方式" @cancel="cancel" @confirm="confirm"
	>
		<view class="u-update-content">
			<image @click="previewImage" style="width: 100%;" :src="`${apuDomain}images/weixin_contact.jpg`" mode=""></image>
			<view style="text-align: center;">点击保存二维码</view>
		</view>
	</u-modal>
	<!-- <u-mask :show="show">
		<view class="contact">
			<image style="width: 100%;" :src="`${apuDomain}images/weixin_contact.jpg`" mode=""></image>
			
		</view>
			<view class="close-btn" @click="show = false">
				×
			</view>
	</u-mask> -->
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
