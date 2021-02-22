<template>
	<view class="content">
		
		<!-- <div class="propagate-text">
			<div>一起来打全场</div>
			<div>This is for You</div>
		</div> -->
		<!-- <div class="into-button" @click="toHome">开始组队</div> -->
		<image style="height:100%;width: 100%;" src="../../static/imgs/home-bg.png" mode=""></image>
		<image 
			style="position: absolute;left: 30px;bottom: 62px;height: 116rpx;width: 221rpx;" 
			@click="toHome" 
			src="../../static/imgs/button1.png" 
			mode="">
		</image>
		<u-checkbox 
			style="position: absolute;bottom: 50rpx;"  
			v-model="checked" 
			:label-disabled="true" 
			:disabled="false" 
			@change="changeBox">
				<span>我已阅读并同意<a style="position: relative;display: inline-block;width: 300rpx;text-decoration: underline">篮球比赛免责协议</a></span>
		</u-checkbox>
		
		<u-top-tips ref="uTips"></u-top-tips>
	</view>
</template>
<script>
	import shareMixin from '../../mixins/share.js'
	export default{
		mixins:[shareMixin],
		data() {
			return {
				checked:'',
				canToHome: false
			}
		},
		methods:{
			toHome() {
				if(!this.canToHome) {
					this.$refs.uTips.show({
						title: '请阅读协议并同意',
						duration: '2000'
					})
					return
				}
				uni.redirectTo({url: '/pages/home/index'})
			},
			changeBox(e) {
				this.canToHome = e.value
			}
		},
	}
</script>
<style lang="scss" scoped>
	.content{
		// background-color: black;
		// background: url('../../static/imgs/main-img.jpeg') no-repeat center;
		position: relative;
		// background: url('../../static/imgs/home-bg.jpeg') no-repeat center;
		background-size: cover;
		height: 100vh;
		width: 100vw;
		display: flex;
		align-items: center;
		// justify-content: center;
		flex-direction: column;
		background-color: #F1F1F1;
		.main-img{
			width: 100%;
		}
		.propagate-text{
			margin-top: 50rpx;
			margin-bottom: 127rpx;
			font-family: cursive;
			color: #1d1810;
			text-align: center;
			font-size: 60rpx;
			animation:textScale 2s ease-in
		}
		.into-button{
			margin-top: 80rpx;
			background-color: #de8d05;
			height: 120rpx;
			line-height: 100rpx;
			width: 300rpx;
			border: 7rpx solid #6b2807;
			border-radius: 6rpx;
			margin: 0 auto;
			// color: #6b2807;
			font-size: 60rpx;
			text-align: center;
		}
	}
	@keyframes textScale
		{
			0% {
				transform:scale(0.2, 0.2);
				opacity: 0.2;
			}
			// 50% {
			// 	transform:scale(1.5, 1.5);
			// 	opacity: 1;
			// }
			100% {
				transform:scale(1, 1);
				opacity: 1;
			}
		}
</style>