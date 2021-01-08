<template>
	<view style="height: 100%;">
		<image class="introduce-img" src="../../static/imgs/209aac44587ae218438ffd83a5a829a0.jpg" mode=""></image>
		
		<view class="match-btn"@click="toDoMessage">
			随缘匹配
		</view>
	</view>
</template>

<script>
	import http from '../../api/index.js'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toDoMessage() {
				uni.navigateTo({url: '/pages/messageForm/index'})
				// http.get('/').then(res => {
				// 	debugger
				// })
			}
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
