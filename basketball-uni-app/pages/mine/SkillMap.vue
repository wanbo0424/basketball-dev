<template>
	<view class="qiun-columns">
		<view class="title">
			<span 
				style="background-color: #f57463;display: inline-block;height: 18rpx;
				width: 18rpx;border-radius: 50%;margin-right: 12rpx;">
			</span>
			个人能力分析
		</view>
		
		<view class="qiun-charts" >
			<canvas canvas-id="canvasRadar" id="canvasRadar" class="charts"></canvas>
		</view>
		<view class="sugesstion">
			技能建议：{{sugesstion}}
		</view>
	</view>
</template>

<script>
	import uCharts from '../../js_sdk/u-charts/u-charts/u-charts.js';
	import http from '../../api/index.js'
	import { mapGetters } from 'vuex'
	var _self;
	var canvaRadar=null;
	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				sugesstion: ''
			}
		},
		mounted() {
			_self = this;
			this.cWidth=uni.upx2px(600);
			this.cHeight=uni.upx2px(540);
			this.getSuggest()
		},
		computed: {
			...mapGetters([
			  'userInfo',
			])
		 },
		methods: {
			getServerData({
				scoreAbility,
				hitRateScore,
				physicalScore,
				stableScore,
				defensiveScore}){
				let series = [
					{
						name: '个人能力分析',
						data: [
							scoreAbility,
							stableScore,
							physicalScore,
							hitRateScore,
							defensiveScore,
						],
						color: '#f57463',
					}
				]
				let Radar = {
					categories:['得分', '稳定', '体能', '命中率', '防守'],
					series
				};
				_self.showRadar("canvasRadar",Radar);
			},
			showRadar(canvasId,chartData){
				canvaRadar=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'radar',
					fontSize:11,
					padding: [16, 0, 0, 0],
					legend:{
						show:false,
						position: 'top',
						float: 'left',
						fontColor: '#f57463',
					},
					background:'#000000',
					pixelRatio:_self.pixelRatio,
					animation: true,
					dataLabel: true,
					categories: chartData.categories,
					series: chartData.series,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						radar: {
							max: 10,//雷达数值的最大值
							gridColor: '#c0cc08',
							labelColor: '#f57463',
							opacity: 0.7
						}
					},
					// colors: ['#1890ff', '#2fc25b', '#facc14', '#f04864', '#8543e0', '#90ed7d']
					
				});
			},
			getSuggest() {
				http.get('weapp/player/getSuggestQuery', {params:{openId: this.userInfo.openId}}).then(res => {
					if(res.data.code === 0) {
						this.sugesstion = res.data.data[0].sugesstion
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.title{
	color: #f57463;
	position: absolute;
	top: -16rpx;
	left: 38rpx;
}
.qiun-columns{
	margin: 80rpx 0 40rpx 0;
	width: 100%;
	height: 500rpx;
	position: relative;
	margin-left: -36rpx;
}
.qiun-charts {
	width: 100%;
	height: 100%;
	border-radius: 18rpx;
}
	
.charts {
	width: 100%;
	height: 100%;
	border-radius: 18rpx;
}
.sugesstion{
	position: absolute;
	color: #c0cc08;
	bottom: 86rpx;
	right: -35rpx;
	width: 265rpx;
}

</style>
