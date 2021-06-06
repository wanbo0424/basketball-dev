<template>
	<view class="mine_page">
		<view class="user_info">
			<view class="avatar_info"> 
				<image style="height: 120rpx;width: 120rpx;border-radius: 10rpx;border: solid 3rpx #fff;" v-if="userInfo.avatarUrl"
				:src="userInfo.avatarUrl" mode=""></image>
				<image v-if="!userInfo.avatarUrl" style="height: 120rpx;width: 120rpx;border-radius: 10rpx;border: solid 3rpx #fff;" src="../../static/imgs/question.png" mode=""></image>
				<h2 style="color:#fff;padding-top: 16rpx;">{{userInfo.nickName}}</h2>
				<!-- <h2 style="color:#fff;padding-top: 16rpx;">余额: 99</h2> -->
			</view>
			
			<view class="gameInfo">
				<view class="" style="display: flex;">
					<view class="" style="width: 50%;">
						积分：{{statisticsInfo.totalEvaluationScore || 0}}
					</view>
					<view class="" style="width: 50%;">
						得分：{{statisticsInfo.totalPersonScore || 0}}
					</view>
				</view>
				<view class="" style="display: flex;padding-top: 20rpx;">
					<view class="" style="width: 50%;">
						排位：{{statisticsInfo.rank + 1 || 0}}
					</view>
					<view class="" style="width: 50%;">
						胜率：{{winRate}}%
					</view>
				</view>
				<view class="" style="display: flex;padding-top: 20rpx;">
					<view class="" style="width: 50%;">
						mvp次数：{{statisticsInfo.mvpCount || 0}}
					</view>
					<view class="" style="width: 50%;">
						场均得分：{{ avgScore }}
					</view>
				</view>
				<view class="" style="display: flex;padding-top: 20rpx;">
					<view class="" style="width: 50%;">
						段位：无
					</view>
					<view
						v-if="!userInfo.nickName" 
						type="primary"
						style="
							width: 50%;
							background-color: #f57463;
							border: solid 2rpx #FFFFFF;
							border-radius: 18rpx;
							color: #FFFFFF;
							padding: 8rpx 20rpx;width: 100rpx;
							position: relative;
							top: -20rpx;
							left: 12rpx;"
						@click="getUserProfile">
						登录
					</view>
				</view>
				
			</view>
		</view>
		
		<skill-map ref="map"></skill-map>
		
		<view class="navigation_list">
			<!-- <u-grid :col="4" :border="false">
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
			</u-grid> -->
			
			<u-grid :col="4" :border="false">
				<u-grid-item @click="getCareer">
					<u-icon name="bisaijilu" custom-prefix="custom-icon" color="#f57463" :size="54"></u-icon>
					<view class="grid-text" >比赛记录</view>
				</u-grid-item>
				<u-grid-item @click="toCoupon">
					<u-icon name="youhuiquan" custom-prefix="custom-icon" color="#f57463" :size="54"></u-icon>
					<view class="grid-text" >优惠券</view>
					<u-badge type="error" :count="couponList.length"></u-badge>
				</u-grid-item>
				<u-grid-item @click="recharge">
					<u-icon name="chongzhi" custom-prefix="custom-icon" color="#f57463" :size="54"></u-icon>
					<view class="grid-text" >充值</view>
				</u-grid-item >
				<u-grid-item @click="toCustomService" >
					<u-icon name="kefu2" custom-prefix="custom-icon" color="#f57463" :size="54"></u-icon>
					<view class="grid-text" >联系客服</view>
				</u-grid-item>
			</u-grid>
			<u-grid :col="4" :border="false">
				<u-grid-item >
					<button plain type="primary" open-type="feedback" 
					style="font-size: 28rpx;border: none;">
						<u-icon name="edit-pen-fill" color="#f57463" style="height: 58rpx;" :size="54"></u-icon>
						<view class="" style="height: 36rpx;line-height: 0;color: #f57463;">
							用户反馈
						</view>
					</button>
				</u-grid-item >
				<u-grid-item @click="subscribe">
					<u-icon name="email-fill" color="#f57463" :size="54"></u-icon>
					<view class="grid-text" >订阅消息</view>
				</u-grid-item >
			</u-grid>
		</view>
		<u-tabbar :list="list"></u-tabbar>
		<custom-service ref="contact"></custom-service>
	</view>
</template>

<script>
	import http from '../../api/index.js'
	import shareMixin from '../../mixins/share.js'
	import SkillMap from './SkillMap'
	import CustomService from './CustomService'
	import { mapGetters, mapActions } from 'vuex'
	export default {
		components:{SkillMap, CustomService},
		data() {
			return {
				list: [
					{
						iconPath: "home",
						selectedIconPath: "home-fill",
						text: '预约组队',
						isDot: true,
						customIcon: false,
						pagePath: '/pages/home/index'
					},
					{
						iconPath: "dingdan",
						selectedIconPath: "dingdan-blue",
						text: '订单',
						isDot: true,
						customIcon: true,
						pagePath: '/pages/orderList/index'
					},
					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						text: '个人主页',
						isDot: false,
						customIcon: false,
						pagePath: '/pages/mine/index'
					}
				],
				statisticsInfo: {},
				couponList: []
			}
		},
		mixins:[shareMixin],
		computed: {
			avgScore() {
				if(this.statisticsInfo.totalPersonScore && this.statisticsInfo.allCount) {
					return (this.statisticsInfo.totalPersonScore / this.statisticsInfo.allCount).toFixed(2)
				}else{
					return 0
				}
			},
			...mapGetters([
			  'userInfo',
			]),
			winRate() {
				if(this.statisticsInfo.allCount) {
					return ((this.statisticsInfo.victoryCount / this.statisticsInfo.allCount) * 100).toFixed(2)
				}else{
					return '0'
				}
			}
		 },
		methods: {
			...mapActions([
			  'getUserInfo', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
			]),
			getStatisticsInfo() {
				http.get('weapp/playerCareer/getCareerDetail', {params: {openId: this.userInfo.openId}}).then(res => {
					if(res.data.code === 0) {
						this.statisticsInfo = res.data.data
						this.$refs.map.getServerData(this.statisticsInfo)
						let sortArr =[
							{value: this.statisticsInfo.scoreAbility, field: 'scoreAbility'}
							,{value: this.statisticsInfo.hitRateScore, field: 'hitRateScore'}
							,{value: this.statisticsInfo.physicalScore, field: 'physicalScore'}
							,{value: this.statisticsInfo.stableScore, field: 'stableScore'}
							,{value: this.statisticsInfo.defensiveScorevalue, field: 'defensiveScorevalue'}
						].sort(function(a, b){
							return a.value - b.value;
						})
						const typeMap = {
						    'scoreAbility': 0,
						    'hitRateScore': 1,
						    'physicalScore': 2,
						    'stableScore': 3,
						    'defensiveScorevalue': 4,
						  }
						let minStatis = typeMap[sortArr[0].field]
						this.$refs.map.getSuggest({type: minStatis})
					}
				})
			},
			toCoupon() {
				uni.navigateTo({
					url: '/pagesA/coupon/index'
				})
			},
			getCareer() {
				uni.navigateTo({url: '/pagesA/match/index'})
			},
			
			getOrderList() {
				uni.navigateTo({url: '/pagesA/order/index?type=all'})
			},
			getTobePaid() {
				uni.navigateTo({url: '/pages/order/index?type=tobe'})
			},
			toCustomService() {
				uni.navigateTo({url: '/pagesA/customService/index'})
			},
			recharge() {
				uni.navigateTo({url: '/pagesA/recharge/index'})
			},
			subscribe() {
				wx.requestSubscribeMessage({
				  tmplIds: ['T4Bq3RFYlZ4f7GWSwuOAvONC9kVYZrBpPwtQ5NwxGZM'],
				  success: (res) => { 
					  console.log(res)
				  },
				  complate: async () => {
				  }
				})
			},
			async getUserProfile() {
				await this.getUserInfo()
			},
			getCouponList() {
				http.get('weapp/player/getCouponList', { params: { openId: this.userInfo.openId } }).then(res => {
					if(res.data.code === 0) {
						this.couponList = res.data.data
					}
				})
			},
		},
		mounted() {
			this.getStatisticsInfo()
			this.getCouponList()
		}
	}
</script>

<style lang="scss" scoped>
.grid-text{
	color: #f57463
}
.mine_page{ 
	background-color: black;
	height: 100vh;
	padding: 50rpx 22rpx 0 22rpx;
	.user_info{
		display: flex;
		align-items: center;
		height: 356rpx;
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
		// background-color: #fff;
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
/deep/{
	.u-grid-item-box{
		background-color: #000000;
	}
}
</style>
