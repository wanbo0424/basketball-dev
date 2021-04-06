<template>
	<view style="margin-top: 36rpx;height: 100%;">
		<!-- <image style="width: 100%;height: 522rpx;" src="../../../static/imgs/process.png" mode=""></image> -->
		<view class="process-item" style="background-image: linear-gradient(-45deg, #ea5942d1, #f1cd8c);">
			<!-- <view class="" style="display: flex"> -->
				<view style="width: 25%;font-weight: 600;font-size: 30rpx;">比赛阶段：</view>
				<view style="width: 75%;color: #615d5d;">
					一、队内1v1车轮赛逐首发；
					<span style="text-decoration: underline;color: red;" @click="viewRule1">比赛规则</span></br>
					二、5v5全场正赛；
					<span style="text-decoration: underline;color: red" @click="viewRule2">比赛规则</span>
				</view>
			<!-- </view> -->
		</view>
		<view class="process-item" style="background-image: linear-gradient(-45deg, #06bfb7, #d3f18c);">
			<view style="width: 25%;font-weight: 600;font-size: 30rpx;">积分原则：</view>
			<view class="" style="width: 75%;color: #615d5d;">
				每场5v5正赛结束后，获胜的队伍中每位球员加200积分；落败的队伍中每位球员加100积分；本场最佳球员（MVP）额外获得100积分；
				积分会累加，按累计积分进行赛季排名
			</view>
		</view>
		<view class="process-item" style="background-image: linear-gradient(-45deg, #ea2f05, #f18ca3);">
			<view style="width: 25%;font-weight: 600;font-size: 30rpx;">赛季奖励：</view>
			<view class="" style="width: 75%;color: #615d5d;">
				本赛季结束时间为9月30日；赛季结束后，将会为排名前三位的优秀球员线下邮寄礼物作为奖励；然后所有球员积分清零，自动进入下一赛季
			</view>
		</view>
		<view class="process-item" style="background-image: linear-gradient(-45deg, #0c68f3, #f18ca3);">
			<view style="width: 25%;font-weight: 600;font-size: 30rpx;">关于保险：</view>
			<view class="" style="width: 75%;color: #615d5d;">
				赛事安心险是为了保障球员安全所提供的免费服务，但需要球员提供个人信息（身份证、姓名、联系方式），
				球员可在申请组队时自行选择是否需要此服务
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
			}
		},
		methods: {
			viewRule1() {
				uni.navigateTo({
					url: '/pagesA/rule/rule1'
				})
			},
			viewRule2() {
				uni.navigateTo({
					url: '/pagesA/rule/rule2'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.process-item{
	display: flex;
	align-items: center;
	min-height: 220rpx;
	margin-bottom: 12rpx;
	box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.3) inset, 0 4rpx 12rpx rgba(0, 0, 0, 0.5);
	padding: 20rpx;
	width: 100%;
}
</style>
