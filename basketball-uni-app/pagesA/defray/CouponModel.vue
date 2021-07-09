<template>
	<view v-if="show"
		class="rank-model"
	>
		<view class="warp">
			<view style="height: 560rpx;position: relative;display: flex;justify-content: center;">
				<div 
					style="
						height: 160rpx;
						line-height: 160rpx;
						width: 294rpx;
						position: absolute;
						top: 252rpx;
						color: rgb(251, 106, 101);
						font-weight: 600;
						text-align: center;
						font-size: 78rpx;"
					>
						<span style="margin-left: -20rpx;">{{quota}}</span>
					</div>
				<image style="height: 560rpx;" src="../static/coupon-portray.png" mode="">
				</image>
				<image
					src="../static/coupon-portray-btn.png" 
					style="position: absolute;height: 69rpx;width: 285rpx;bottom: 60rpx;" mode=""
					@click="close"
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
			quota: {
				type: Number,
				default: 0
			}
		},
		data() {
			return{
				show: false
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
				this.$emit('confirm')
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
		right: 36rpx;
		color: #FFFFFF;
		font-size: 40rpx;
	}
}
</style>
