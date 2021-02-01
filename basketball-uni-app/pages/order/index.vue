<template>
	<view>
		<template v-for="(item, index) in orderList">
			<u-card style="height: 60rpx;" margin="30rpx 20rpx" :title="`订单号：${item.orderId}`" :sub-title="item.createTime" :key="index">
				<view class="" slot="body">

				</view>
			</u-card>
		</template>
	</view>
</template>

<script>
	import http from '../../api/index.js'
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				orderList:[]
			}
		},
		computed: {
			...mapGetters([
			  'userInfo',
			])
		 },
		 mounted() {
			 http.get('weapp/personOrderList', {params: {openId: this.userInfo.openId}}).then(res => {
			 	if(res.data.code === 0) {
			 		this.orderList = res.data.data
			 	}
			 })
		 },
		methods: {
			
		}
	}
</script>

<style>

</style>
