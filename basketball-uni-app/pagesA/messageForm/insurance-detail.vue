<template>
	<u-popup v-model="show" mode="bottom" :height="680">
		<view class="container">
			<h3 class="title">
				众行天下-球类运动保险
			</h3>
			<view class="content">
				<view class="" style="font-weight: bold;font-size: 26rpx;">
					保障权益
				</view>
				<u-row gutter="16" class="row-item">
					<u-col span="9">
						意外身故/伤残
					</u-col>
					<u-col span="3">
						15万元
					</u-col>
				</u-row>
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default{
		data() {
			return{
				show: false
			}
		},
		methods:{
			init() {
				this.show = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		padding: 30rpx 26rpx;
		.content{
			padding: 0 24rpx;
			.row-item{
				margin-top: 14rpx;
				line-height: 40rpx;
				color: #939393;
			}
		}
	}
	
</style>
