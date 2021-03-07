<template>
	<view style="width: 100vw;height: 100vh;">
			<view>
				<u-tabs-swiper ref="uTabs" :list="swiperList" active-color="#f57463" :current="current" @change="tabsChange"
				 swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper 
			style="height: calc(100% - 80rpx);
			background: url(../../static/imgs/order-bg.jpg);opacity: 0.7;
			background-size: cover;
			background-repeat:no-repeat;
			" 
			:current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item" v-for="(item, index) in tabs" :key="index">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
						{{index}}
					</scroll-view>
				</swiper-item>
			</swiper>
			
		<u-tabbar :list="list"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				swiperCurrent: 0,
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
				swiperList: [
					{name: '待支付'},
					{name: '待参赛'},
					{name: '已参赛'},
					{name: '订单记录'},
				],
				tabs: [
					1,2,3,4
				]
			}
		},
		methods: {
			tabsChange(index) {
				// this.current = index
				this.swiperCurrent = index
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
		}
	}
</script>

<style lang="scss" scoped>
/deep/{
	.u-tabs-item{
		width: 25%;
	}
}
</style>
