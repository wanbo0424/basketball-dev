<template>
	<view class="mine_page">
		<view class="user_info">
			<image style="height: 120rpx;width: 120rpx;border-radius: 10rpx;" :src="userInfo.avatarUrl" mode=""></image>
			<h2 style="color:#fff;padding-left: 40rpx;">{{userInfo.nickName}}</h2>
		</view>
		<view class="navigation_list">
			<u-grid :col="3" :border="false">
				<u-grid-item @click="getOrderList">
					<u-icon name="order" :size="46"></u-icon>
					<view class="grid-text" >全部订单</view>
				</u-grid-item>
				<u-grid-item @click="getTobePaid">
					<u-icon name="rmb-circle" :size="46"></u-icon>
					<view class="grid-text" >待支付</view>
				</u-grid-item>
				<u-grid-item @click="getCareer">
					<u-icon name="list" :size="46"></u-icon>
					<view class="grid-text" >比赛记录</view>
				</u-grid-item >
			</u-grid>
		</view>
		<view class="cell_list">
			优惠券
			<u-icon name="arrow-right" style="float: right;"></u-icon>
		</view>
		
		
	</view>
</template>

<script>
	import http from '../../api/index.js'
	import shareMixin from '../../mixins/share.js'
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
			}
		},
		mixins:[shareMixin],
		computed: {
			...mapGetters([
			  'userInfo',
			])
		 },
		methods: {
			getCareer() {
				uni.navigateTo({url: '/pages/match/index'})
			},
			
			getOrderList() {
				uni.navigateTo({url: '/pages/order/index?type=all'})
			},
			getTobePaid() {
				uni.navigateTo({url: '/pages/order/index?type=tobe'})
			}
		}
	}
</script>

<style lang="scss" scoped>
.mine_page{ 
	padding: 50rpx 22rpx 0 22rpx;
	
	.user_info{
		display: flex;
		align-items: center;
		height: 210rpx;
		margin: 0 30rpx;
		padding-left: 45rpx;
		background-color: #f5c08a;
		border-radius: 30rpx 30rpx 0 0;
	}
	.navigation_list{
		background-color: #fff;
		border-radius: 20rpx;
	}
	.cell_list{
		display: flex;
		justify-content: space-between;
		background-color: #fff;
		margin-top: 30rpx;
		border-radius: 18rpx;
		height: 75rpx;
		line-height: 75rpx;
		padding: 0 20rpx;
	}
	
}

</style>
