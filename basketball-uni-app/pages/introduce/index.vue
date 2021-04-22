<template>
	<view style="height: 100%;padding: 0 22rpx;position: relative;">
		<col-toast></col-toast>
		<view class="wrap">
			<u-swiper height="400" :list="swiperList" ></u-swiper>
		</view>
		
		<!-- 排名 -->
		<player-rank></player-rank>
		
		<!-- 流程 -->
		<process-introduce @view-rule="viewRuleHandle"></process-introduce>
		
		<!--  -->
		<a
			style="
			text-align: center;
			position: relative;
			margin-top: 40rpx;font-size: 28rpx;width: 100%;
			color: #fd6060;text-decoration: underline;" 
			@click="howCreate">怎么组队？
		</a>
		<view class="match-btn"@click="toDoMessage">
			<image
				style="height: 116rpx;width: 221rpx;" 
				src="../../static/imgs/button1.png" 
				mode="">
			</image>
		</view>
		<view class="share_button_view"
			@click="() => {
				$refs.share.draw()
			}">
			<u-icon name="share" custom-prefix="custom-icon" color="#fff" size="30" ></u-icon>
			<view class="" style="color: #FFFFFF;font-weight: 500;">
				分享
			</view>
		</view>
		<custom-canvas ref="share"></custom-canvas>
		<button open-type="getUserInfo"></button>
	</view>
</template>

<script>
	import http from '../../api/index.js'
	import PlayerRank from './PlayerRank/index.vue'
	import ProcessIntroduce from './ProcessIntroduce/index.vue'
	import Toast from '../index/Toast'
	import CustomCanvas from '../canvas/share'
	// import { mapActions } from 'vuex'
	export default {
		components:{
			PlayerRank,
			ProcessIntroduce,
			ColToast: Toast,
			CustomCanvas,
		},
		data() {
			return {
				swiperList: [
					{
						image: '/static/imgs/banner_01.png',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
				ruleContent: ''
			}
		},
		created() {
			// this.getUserInfo()
		},
		methods: {
			// 获取用户信息
			// ...mapActions([
			//   'getUserInfo', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
			// ]),
			toDoMessage() {
				uni.navigateTo({url: '/pagesA/messageForm/index'})
				// http.get('/').then(res => {
				// 	debugger
				// })
			},
			viewRuleHandle(content) {
				this.$refs.mask.show = true
				this.ruleContent = content
			},
			howCreate() {
				uni.navigateTo({
					url: '/pagesA/rule/rule3'
				})
			}
		},
		
		mounted() {
			
		}
	}
</script>

<style lang="scss">
.introduce-img{
	width: 100%;
}
.match-btn{
	// width: 250rpx;
	// height: 250rpx;
	
	margin-top: 20rpx;
	// background-color: #de8d05;
	text-align: center;
	// font-size: 50rpx;
	// font-weight: 500;
}
.share_button_view{
	height: 86rpx;
	width: 86rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	background-color: #ff0000;
	position: fixed;
	bottom: 260rpx;
	right: 16rpx;
}
</style>
