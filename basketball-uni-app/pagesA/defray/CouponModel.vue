<template>
	<view v-if="show"
		class="rank-model"
	>
		<view class="warp">
			<view style="height: 560rpx;position: relative;display: flex;justify-content: center;">
				<image style="height: 560rpx;" src="../static/coupon-portray.png" mode="">
				</image>
				<image
					src="../static/coupon-portray-btn.png" 
					style="position: absolute;height: 69rpx;width: 285rpx;bottom: 60rpx;" mode=""
					@click=""
					>
				</image>
				<view class="close-btn" @click="close">×</view>	
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			value: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return{
				show: true
			}
		},
		watch:{
			value(val) {
				if(val) {
					this.show = true
				}
			}
		},
		methods: {
			close() {
				this.show = false
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '../../common/common.scss';
.warp{
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	.close-btn{
		position: absolute;
		top: 0;
		right: 16rpx;
		color: #FFFFFF;
		font-size: 34rpx;
	}
}
</style>
