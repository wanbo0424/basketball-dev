<template>
	<view v-if="show" class="rank-model">
		<view class="contact" v-html="content">
		</view>
		<view class="close-btn" @click="show = false">×</view>	
	</view>
</template>

<script>
	export default {
		props:{
			content: {
				type: String,
				default: ''	
			}
		},
		data() {
			return {
				show: false
			}
		},
		methods: {
			
		}
	}
</script>
<style lang="scss" scoped>
.rank-model{
	position: fixed;
	overflow: hidden;
	background-color: rgba(0, 0, 0, 0.8);
	top: 0;
	bottom: 0;
	left: 0;
	z-index: 100;
	right: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}

.contact{
	padding: 20rpx;
	width: 70%;
	background-color: #FFFFFF;
}
.close-btn{
	margin-top: 28rpx;
	width: 80rpx;
	height: 80rpx;
	line-height: 70rpx;
	border: 2rpx solid #FFFFFF;
	border-radius: 50%;
	color: #FFFFFF;
	text-align: center;
	font-size: 60rpx;
}
</style>