<template>
	<view class="order_content">
		<template v-for="(item, index) in orderList">
			<view class="order_item">
				<view class="order_title">
					<h2>d{{item.out_trade_no || item.order_id}}</h2>
					<span style="color: #999999;">{{item.status | status}}</span>
				</view>
				<view class="order_body">
					<view>比赛地点：{{item.gameAddress || ''}}</view>
					<view>比赛时间：{{item.gameDate || ''}}</view>
				</view>
				<view class="order_footer">
					<view>下单时间：{{item.createTime ? moment(item.createTime).format('YYYY-MM-DD HH:mm:ss') : ''}}</view>
					<view>合计：¥50</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	import http from '../../api/index.js'
	import moment from 'moment'
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				orderList:[]
			}
		},
		filters:{
			status(val) {
				if(val === 0) {
					return '待支付'
				}else if(val === 1) {
					return '已支付定金'
				}else if(val === 3) {
					return '已支付全款'
				}
			}
		},
		computed: {
			...mapGetters([
			  'userInfo',
			])
		 },
		 onLoad: function({type}) {
			 http.get('weapp/getAllOrderByuser', {params: {openId: this.userInfo.openId}}).then(res => {
			 	if(res.data.code === 0) {
					if(type === 'all') {
						this.orderList = res.data.data
					}else{
						this.orderList = res.data.data.filter(item => item.status !== 2)
					}
			 	}
			 })
		 },
		 mounted() {
			 
		 },
		methods: {
			moment,
		}
	}
</script>

<style lang="scss" scoped>
.order_content{
	background-color: #F1F1F1;
	height: 100vh;
	padding: 0 26rpx;
	.order_item{
		border-radius: 20rpx;
		margin-bottom: 20rpx;
		padding: 0 20rpx 20rpx 20rpx;
		background-color: #fff;
		.order_title{
			padding: 15px 0;
			display: flex;
			justify-content: space-between;
			border-bottom: 2rpx solid #C8C7CC;
		}
		.order_body{
			padding: 25rpx 0;
		}
		.order_footer{
			display: flex;
			justify-content: space-between;
		}
	}
}
</style>
