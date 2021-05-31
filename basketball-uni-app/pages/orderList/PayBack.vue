<template>
	<view>
		<view class="payBack-info">
			<h2 style="text-align: center;">退款说明</h2>
			关于退款</br>
			1.退款只能办理一次</br>
			2.退款费用核收标准</br>
			  （1）距离比赛正式开始前7天及以上的不收取退款费；比赛开始前72小时以上不足7天的按订单价格的50%收取；距离比赛正式开始前48小时不足72小时的
			按订单价格的80%收取；距离比赛正式开始前不足48小时的按订单价格的100%收取</br>
			  （2）如果没有组队成功，在比赛开始前12小时内，我们会为您退款（原路返回）
		</view>
		<view class="contact">
			如需退款，请点击并保存下方二维码添加客服微信办理相关退款事宜
			<image @click="previewImage" style="width: 300rpx;height: 300rpx;" :src="`${apuDomain}images/weixin_contact.jpg`" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				apuDomain:this.$apuDomain
			}
		},
		methods: {
			previewImage() {
				uni.previewImage({
					urls: [`${this.$apuDomain}images/weixin_contact.jpg`],
					longPressActions: {
						itemList: ['保存相册', '识别二维码']
					}
				})
			}
		}
	}
</script>

<style>
.contact{
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin-top: 40rpx;
}
</style>
