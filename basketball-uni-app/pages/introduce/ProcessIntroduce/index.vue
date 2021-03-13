<template>
	<view style="margin-top: 36rpx;height: 100%;">
		<!-- <image style="width: 100%;height: 522rpx;" src="../../../static/imgs/process.png" mode=""></image> -->
		<view class="process-item" style="background-image: linear-gradient(-45deg, #ea5942d1, #f1cd8c);">
			<view class="" style="display: flex">
				<view style="width: 490rpx;">比赛分为两个阶段：</view>
				<view>
					第一阶段8人队内斗牛；
					<span style="text-decoration: underline;">比赛规则。</span>
					第二阶段5v5正赛；
					<span style="text-decoration: underline;">比赛规则</span>
				</view>
			</view>
		</view>
		<view class="process-item" style="background-image: linear-gradient(-45deg, #06bfb7, #d3f18c);">
			保险：运动险需要填写敏感信息（身份证，姓名等），用户自愿选择是否需要。
		</view>
		<view class="process-item" style="background-image: linear-gradient(-45deg, #0c68f3, #f18ca3);">
			积分原则：对于获胜的队伍所有球员加200分；落败的队伍所有球员100分；评选出的本场最佳球员（MVP）额外获得100积分
		</view>
		<view class="process-item" style="background-image: linear-gradient(-45deg, #ea2f05, #f18ca3);">
			赛季奖励：5月9日--10月9日为第一个赛季；赛季结束后积分排名前三位的会进行礼物奖励；所有人的积分清零，段位降档。自动进入下一赛季
			
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
			
		}
	}
</script>

<style lang="scss" scoped>
.process-item{
	display: flex;
	align-items: center;
	height: 220rpx;
	margin-bottom: 12rpx;
	box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.3) inset, 0 4rpx 12rpx rgba(0, 0, 0, 0.5);
	padding: 20rpx;
}
</style>
