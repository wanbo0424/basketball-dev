<template>
	<view>
		<u-grid :col="2">
			<u-grid-item>
				<u-icon name="photo" :size="46"></u-icon>
				<view class="grid-text" @click="getCareer">比赛记录</view>
			</u-grid-item>
			<u-grid-item>
				<u-icon name="lock" :size="46"></u-icon>
				<view class="grid-text">订单记录</view>
			</u-grid-item>
		</u-grid>
		
	</view>
</template>

<script>
	import http from '../../api/index.js'
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
			}
		},
		computed: {
			...mapGetters([
			  'userInfo',
			])
		 },
		methods: {
			getCareer() {
				uni.navigateTo({url: '/pages/match/index'})
			}
		}
	}
</script>

<style>

</style>
