<template>
	<view class="">
		<view>
			报名成功
		</view>
		<button type="default" @click="bindPay">去支付</button>
	</view>
</template>
<script>
import {generateOrderNumber} from '../../utils/payUtils.js'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			bindPay() { 
				let orderParams = {
					mchid: '',
					total_fee: 5000,
					out_trade_no: generateOrderNumber(),
					body: '报名预交金',
					notify_url: ''
				}
				
				http.post('weapp/prepaid', this.form).then(res => {
					if(res.code === 0) {
						this.$refs.uToast.show({
							title: '信息登记成功',
							type: 'success',
							url: '/pages/defray/index'
						})
					}
				})
				// uni.request({
				// 	url: 'https://www.example.com/request', //仅为示例，并非真实接口地址。
				// 	data: orderParams,
				// 	header: {
				// 		'custom-header': 'hello' //自定义请求头信息
				// 	},
				// 	success: (res) => {
				// 		console.log(res.data);
				// 		this.text = 'request success';
				// 	}
				// })
			}
		}
	}
</script>

<style>

</style>
