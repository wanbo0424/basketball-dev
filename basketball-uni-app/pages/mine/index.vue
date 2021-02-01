<template>
	<view>
		<u-grid :col="2">
			<u-grid-item @click="getCareer">
				<u-icon name="list" :size="46"></u-icon>
				<view class="grid-text" >比赛记录</view>
			</u-grid-item >
			<u-grid-item @click="getOrder">
				<u-icon name="order" :size="46"></u-icon>
				<view class="grid-text" >订单记录</view>
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
			},
			
			getOrder() {
				uni.navigateTo({url: '/pages/order/index'})
			}
		}
	}
</script>

<style>

</style>
