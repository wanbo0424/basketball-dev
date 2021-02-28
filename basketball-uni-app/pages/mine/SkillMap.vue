<template>
	<view class="qiun-columns">
		<!-- <view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">雷达图</view>
		</view> -->
		<view class="qiun-charts" >
			<canvas canvas-id="canvasRadar" id="canvasRadar" class="charts"></canvas>
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
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
			}
		},
		mounted() {
			_self = this;
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(750);
			this.getServerData();
		},
		computed: {
			...mapGetters([
			  'userInfo',
			])
		 },
		methods: {
			getServerData(){
				// uni.request({
				// 	url: 'https://www.ucharts.cn/data.json',
				// 	data:{
				// 	},
				// 	success: function(res) {
				// 		console.log(res.data.data)
				// 		let Radar = {
				// 			categories:['得分能力', '速度值', '体力值', '经验值', '防守值'],
				// 			series:[],
				// 		};
				// 		Radar.categories=res.data.data.Radar.categories;
				// 		debugger
				// 		Radar.series=res.data.data.Radar.series;
				// 		_self.showRadar("canvasRadar",Radar);
				// 	},
				// 	fail: () => {
				// 		_self.tips="网络错误，小程序端请检查合法域名";
				// 	},
				// });
				http.get('weapp/playerCareer/getCareerDetail', {params:{openId: this.userInfo.openId}}).then(res => {
					if(res.data.code === 0) {
						let {scoreAbilityTotal, speedTotal,staminaTotal,experienceTotal,defensiveTotal} = res.data.data
						let gameLength = res.data.data.gameIdList.length
						let series = [
							{
								name: 'aa',
								data: [
									3,
									speedTotal/gameLength,
									staminaTotal/gameLength, 
									experienceTotal/gameLength,
									defensiveTotal/gameLength
								],
								color: '#facc14'
							}
							
						]
						let Radar = {
							categories:['得分', '速度', '体力', '经验', '防守'],
							series
						};
						_self.showRadar("canvasRadar",Radar);
					}
				})
			},
			showRadar(canvasId,chartData){
				canvaRadar=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'radar',
					fontSize:11,
					legend:{show:true},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					animation: true,
					dataLabel: true,
					categories: chartData.categories,
					series: chartData.series,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						radar: {
							max: 10//雷达数值的最大值
						}
					},
					// colors: ['#1890ff', '#2fc25b', '#facc14', '#f04864', '#8543e0', '#90ed7d']
					
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.qiun-columns{
	margin-top: 40rpx;
	
}
.qiun-charts {
	width: 100%;
	height: 375rpx;
	background-color: #FFFFFF;
	border-radius: 18rpx;
}
	
.charts {
	width: 100%;
	height: 375rpx;
	border-radius: 18rpx;
	background-color: #FFFFFF;
}

</style>
