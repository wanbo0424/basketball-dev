<template>
	<view v-if="show"
		class="rank-model"
	>
	<!-- style="position: fixed;
	overflow: hidden;
	background-color: #333333;
	top: 0;
	bottom: 0;
	left: 0;
	z-index: 100;
	right: 0;" -->
		<view class="warp" >
			<view class="detail-area">
				<view class="rank-list-header">
					<view class="" :style="{width: `${head.width}`}" v-for="(head, index) in headers" :key="index">
						{{head.name}}
					</view>
				</view>
				<view class="rank-list">
					<view class="rank-list-item" v-for="(item, index) in datas" :key="index">
						<view class="list-item-text" :style="{width: '10%'}">
							{{item.rank}}
						</view>
						<view class="avatar" :style="{width: '13%'}">
							{{item.avatarUrl}}
						</view>
						<view class="list-item-text" :style="{width: '37%'}">
							{{item.nickName}}
						</view>
						<view class="list-item-text" :style="{width: '15%'}">
							{{item.evaluationScoreTotal}}
						</view>
						<view class="list-item-text" :style="{width: '25%'}">
							{{levelName(item.evaluationScoreTotal)}}
						</view>
					</view>
				</view>
			</view>
			<view class="close-btn" @click="show = false">×</view>	
		</view>
	</view>
</template>

<script>
	import { LEVEL_TYPE } from '../../../utils/constant.js'
	export default {
		data() {
			return {
				show: false,
				headers:[
					{name: '排行', width: '10%' },
					{name: '头像', width: '13%' },
					{name: '昵称', width: '37%' },
					{name: '积分', width: '15%' },
					{name: '段位', width: '25%' },
				],
				datas: []
			}
		},
		computed:{
			levelName() {
				return (evaluationScoreTotal) => {
					let levelName = ''
					for(let key in LEVEL_TYPE) {
						if(evaluationScoreTotal >= LEVEL_TYPE[key].min && evaluationScoreTotal < LEVEL_TYPE[key].max) {
							levelName = key
							break
						}
					}
					return levelName
				}
			}
		},
		methods: {
			init(datas) {
				this.show = true
				this.datas = datas
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '../../../common/common.scss';
.close-btn{
	width: 80rpx;
	height: 80rpx;
	line-height: 80rpx;
	color: #FFFFFF;
	border: 2rpx solid #FFFFFF;
	border-radius: 50%;
	font-size: 46rpx;
	position: relative;
	left: 50%;
	margin-top: 20rpx;
	transform: translate(-50%);
	text-align: center;
}
.warp{
	width: 90%;
	height: 80%;
	position: absolute;
	left:50%;
	top:42%;
	transform: translate(-50%, -50%);
	background-size: cover;
	background-image: url(/pagesA/static/detail_bg.png);
	border: 4rpx solid #fff;
	border-radius: 10rpx;
	padding: 0 24rpx;
	.detail-area{
		position: relative;
		top: 320rpx;
		height: 100%;
		// margin-top: 320rpx;
		.rank-list-header{
			display: flex;
			color: #FFFFFF;
			text-align: center;
		}
		.rank-list{
			height: calc(100% - 400rpx);
			overflow-y: scroll;
			.rank-list-item{
				display: flex;
				height: 100rpx;
				border-bottom: 3rpx solid #FFFFFF;
				.avatar{
					text-align: center;
				}
				.list-item-text{
					text-align: center;
					color: #FFFFFF;
					line-height: 100rpx;
				}
			}
		}
	}
}
</style>
