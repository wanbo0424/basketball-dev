<template>
	<view style="height: 100%;padding: 0 22rpx;">
		<view class="wrap">
			<u-swiper height="400" :list="swiperList" ></u-swiper>
		</view>
		
		<!-- 排名 -->
		<player-rank></player-rank>
		
		<!-- 流程 -->
		<process-introduce ></process-introduce>
		<view class="match-btn"@click="toDoMessage">
			<image
				style="height: 116rpx;width: 221rpx;" 
				src="../../static/imgs/button1.png" 
				mode="">
			</image>
		</view>
		
		<button open-type="getUserInfo"></button>
	</view>
</template>

<script>
	import http from '../../api/index.js'
	import PlayerRank from './PlayerRank'
	import ProcessIntroduce from './ProcessIntroduce'
	// import { mapActions } from 'vuex'
	export default {
		components:{
			PlayerRank,
			ProcessIntroduce
		},
		data() {
			return {
				swiperList: [
					{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
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
				]
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
				uni.navigateTo({url: '/pages/messageForm/index'})
				// http.get('/').then(res => {
				// 	debugger
				// })
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
	
	margin-top: 40rpx;
	// background-color: #de8d05;
	text-align: center;
	// font-size: 50rpx;
	// font-weight: 500;
}
</style>
