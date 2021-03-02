<template>
	<view class="mine_page">
		<view class="user_info">
			<view class="avatar_info"> 
				<image style="height: 120rpx;width: 120rpx;border-radius: 10rpx;" :src="userInfo.avatarUrl" mode=""></image>
				<h2 style="color:#fff;padding-top: 16rpx;">{{userInfo.nickName}}</h2>
			</view>
			
			<view class="gameInfo">
				<view class="" style="display: flex;">
					<view class="">
						积分:444
					</view>
					<view class="" style="margin-left: 30rpx;">
						得分:333
					</view>
				</view>
				<view class="" style="display: flex;">
					<view class="">
						排位:58
					</view>
					<view class="" style="margin-left: 30rpx;">
						胜率:30%
					</view>
				</view>
			</view>
		</view>
		
		<skill-map ref="map"></skill-map>
		
		<view class="navigation_list">
			<u-grid :col="4" :border="false">
				<u-grid-item @click="getOrderList">
					<u-icon name="74wodedingdan" custom-prefix="custom-icon" color="#f57463" :size="54"></u-icon>
					<view class="grid-text" >全部订单</view>
				</u-grid-item>
				<u-grid-item @click="getTobePaid">
					<u-icon name="daizhifudingdan" custom-prefix="custom-icon" color="#f57463" :size="54"></u-icon>
					<view class="grid-text" >待支付</view>
				</u-grid-item>
				<u-grid-item @click="getCareer">
					<u-icon name="daishiyong" custom-prefix="custom-icon" color="#f57463"  :size="54"></u-icon>
					<view class="grid-text" >待参赛</view>
				</u-grid-item >
				<u-grid-item @click="getCareer">
					<u-icon name="yiwancheng" custom-prefix="custom-icon" color="#f57463"  :size="54"></u-icon>
					<view class="grid-text" >已完成</view>
				</u-grid-item >
			</u-grid>
			
			<u-grid :col="4" :border="false">
				<u-grid-item @click="getOrderList">
					<u-icon name="bisaijilu" custom-prefix="custom-icon" color="#f57463" :size="54"></u-icon>
					<view class="grid-text" >比赛记录</view>
				</u-grid-item>
				<u-grid-item @click="getTobePaid">
					<u-icon name="youhuiquan" custom-prefix="custom-icon" color="#f57463" :size="54"></u-icon>
					<view class="grid-text" >优惠券</view>
				</u-grid-item>
				<u-grid-item @click="getCareer">
					<u-icon name="chongzhi" custom-prefix="custom-icon" color="#f57463" :size="54"></u-icon>
					<view class="grid-text" >充值</view>
				</u-grid-item >
				<u-grid-item @click="getCareer">
					<u-icon name="kefu2" custom-prefix="custom-icon" color="#f57463" :size="54"></u-icon>
					<view class="grid-text" >联系客服</view>
				</u-grid-item >
			</u-grid>
		</view>
		
		
	</view>
</template>

<script>
	import http from '../../api/index.js'
	import shareMixin from '../../mixins/share.js'
	import SkillMap from './SkillMap'
	import { mapGetters } from 'vuex'
	export default {
		components:{SkillMap},
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
			},
		},
		
	}
</script>

<style lang="scss" scoped>
.grid-text{
	color: #f57463
}
.mine_page{ 
	padding: 50rpx 22rpx 0 22rpx;
	.user_info{
		display: flex;
		align-items: center;
		height: 210rpx;
		// margin: 0 30rpx;
		// padding-left: 45rpx;
		background-color: #f57463;
		border-radius: 30rpx 30rpx 0 0;
		.avatar_info{
			width: 40%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding-left: 10rpx;
		}
		.gameInfo{
			width: 60%;
			color: #FFFFFF;
		}
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
