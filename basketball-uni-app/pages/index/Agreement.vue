<template>
	<view v-if="show"
		class="rank-model"
	>
		<view class="warp" >
			<view class="" style="height: 92%;">
				<view class="header">
					参赛用户协议
				</view>
				<view class="content" v-html="content">
					
				</view>
			</view>
			
			<view class="footer" @click="show = false">
				<view class="button" @click="show = false">
					取消
				</view>
				<view class="button" style="color: #2979ff;" @click="$emit('agree')">
					同意
				</view>
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
			content: {}
		},
		data() {
			return{
				show: false
			}
		},
		methods: {
		},
		watch:{
			show(val) {
				if(!val) {
					this.$emit((this.$options.model && this.$options.model.event) || 'input', val)
				}
			},
			value(val) {
				if(val) {
					this.show = true
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../common/common.scss';
	.warp{
		background-color: #fff;
		width: 92%;
		height: 80%;
		position: absolute;
		left:50%;
		top:50%;
		transform: translate(-50%, -50%);
		background-size: cover;
		border: 4rpx solid #fff;
		border-radius: 10rpx;
		padding: 0 24rpx;
		.header{
			// position: fixed;
			top: 0;
			width: 100%;
			height: 70rpx;
			line-height: 70rpx;
			background-color: #FFFFFF;
			text-align: center;
			font-size: 34rpx;
		}
		.content{
			overflow-y: scroll;
			height: calc(100% - 70rpx);
		}
		.footer{
			display: flex;
			height: 8%;
			width: 100%;
			background-color: #FFFFFF;
			.button{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 50%;
				font-size: 32rpx;
			}
		}
	}
</style>
