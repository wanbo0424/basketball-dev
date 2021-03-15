<template>
	<view class="">
		{{content}}
	</view>
</template>

<script>
	import http from '../../api/index.js'
	export default{
		data() {
			return {
				content: '预支付成功，稍后会发送短信通知比赛时间地点。请准时到达场地支付尾款并参赛！'
			}
		},
		onLoad: function({out_trade_no}) {
			http.get('weapp/getTrade_noDetail', {params: {out_trade_no}}).then(res => {
				console.log('支付结果', res)
				if(res.data.status === 1) {
					this.content = '预支付成功，稍后会发送短信通知比赛时间地点。请准时到达场地支付尾款并参赛！'
				}else if(res.data.status === 0) {
					this.content = '预支付失败'
				}
			})
		}
	}
</script>

<style>
</style>
