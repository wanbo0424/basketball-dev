<template>
	<view class="content">
		<u-time-line>
			<u-time-line-item nodeTop="2">
				<!-- 此处自定义了左边内容，用一个图标替代 -->
				<template v-slot:node>
					<view class="u-node" style="background: #19be6b;">
						<!-- 此处为uView的icon组件 -->
						<u-icon name="man-add-fill" color="#fff" :size="24"></u-icon>
					</view>
				</template>
				<template v-slot:content>
					<view>
						<view class="u-order-title">我要组队</view>
						<view class="u-order-desc">
							用户使用微信扫描小程序进入预约组队页（可与好友微信分享进入预约组队页），点击"点击组队"
						</view>
						<view class="u-order-time">2019-05-08 12:12</view>
					</view>
				</template>
			</u-time-line-item>
			<u-time-line-item>
				<template v-slot:node>
					<view class="u-node" style="background: #19be6b;">
						<!-- 此处为uView的icon组件 -->
						<u-icon name="edit-pen-fill" color="#fff" :size="24"></u-icon>
					</view>
				</template>
				<template v-slot:content>
					<view>
						<view class="u-order-title">填写信息</view>
						<view class="u-order-desc">进入预约页面，输入自己的个人信息（是否需交保险可选填），点击提交</view>
						<view class="u-order-time">2019-12-06 22:30</view>
					</view>
				</template>
			</u-time-line-item>
			<u-time-line-item>
				<template v-slot:node>
					<view class="u-node" style="background: #19be6b;">
						<!-- 此处为uView的icon组件 -->
						<u-icon name="rmb-circle-fill" color="#fff" :size="24"></u-icon>
					</view>
				</template>
				<template v-slot:content>
					<view>
						<view class="u-order-title">支付</view>
						<view class="u-order-desc">当系统提示提交成功后，系统会自动提示您支付金额，可进行支付</view>
						<view class="u-order-time">2019-12-06 22:30</view>
					</view>
				</template>
			</u-time-line-item>
			<u-time-line-item>
				<template v-slot:node>
					<view class="u-node" style="background: #19be6b;">
						<!-- 此处为uView的icon组件 -->
						<u-icon name="checkbox-mark" color="#fff" :size="24"></u-icon>
					</view>
				</template>
				<template v-slot:content>
					<view>
						<view class="u-order-title">预约成功</view>
						<view class="u-order-desc">
							根据提交信息，球队经理会为您匹配球赛，匹配成功后在“订单”待参赛点击相应比赛查看入场券
						</view>
						<view class="u-order-time">2019-12-06 22:30</view>
					</view>
				</template>
			</u-time-line-item>
		</u-time-line>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		padding: 10rpx 24rpx;
		.u-node {
			width: 44rpx;
			height: 44rpx;
			border-radius: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #d0d0d0;
		}
		
		.u-order-title {
			color: #333333;
			font-weight: bold;
			font-size: 32rpx;
		}
		
		.u-order-desc {
			color: rgb(150, 150, 150);
			font-size: 28rpx;
			margin-bottom: 6rpx;
		}
		
		.u-order-time {
			color: rgb(200, 200, 200);
			font-size: 26rpx;
		}
	}
</style>
