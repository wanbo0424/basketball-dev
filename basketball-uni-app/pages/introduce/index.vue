<template>
	<view style="height: 100%;padding: 0 22rpx;">
		<image class="introduce-img" src="../../static/imgs/209aac44587ae218438ffd83a5a829a0.jpg" mode=""></image>
		
		<!-- 排名 -->
		<player-rank></player-rank>
		
		<!-- 流程 -->
		<process-introduce></process-introduce>
		<view class="match-btn"@click="toDoMessage">
			随缘匹配
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
	width: 250rpx;
	height: 250rpx;
	line-height: 250rpx;
	border-radius: 50%;
	margin: 0 auto;
	margin-top: 400rpx;
	background-color: #de8d05;
	text-align: center;
	font-size: 50rpx;
	font-weight: 500;
}
</style>
