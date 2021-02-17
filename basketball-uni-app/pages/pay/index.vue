<template>
	<view class="">
		<view class="bg" catchtap="onTapCancel"></view>
		<view class="modal">
		  <view class="content">支付需要跳转到第三方平台进行</view>
		  <button type="default" @click="confirmGator">确认跳转</button>
		  <!-- <navigator class="button" target="miniProgram" app-id="wx2574b5c5ee8da56b" path="pages/cashier/cashier" extra-data="{{ params }}" version="{{ envVersion }}" bindsuccess="navigateSuccess" bindfail="navigateFail">确认跳转</navigator> -->
		</view>
	</view>
</template>

<script>
	import {generateOrderNumber, getRandomNumber, getSign} from '../../utils/payUtils.js'
	export default{
		data() {
			return {
				showPayModal: false,
				out_trade_no: ''
			}
		},
		onLoad: function({out_trade_no, toPaied}) {
			this.out_trade_no = out_trade_no
		},
		methods:{ 
			confirmGator() {
				// this.showPayModal = true
				let orderData = {
					mchid: '6c651e680f7b4eda9050259dc38ffe48',
					total_fee: 1,
					out_trade_no: this.out_trade_no,
					body: '报名预交金',
					notify_url: 'http://39.101.161.231/weapp/prepaidCb',
					nonce_str: getRandomNumber(),
				}
				let orderParams = {
					...orderData,
					sign: getSign(orderData)
				}
				uni.navigateToMiniProgram({
					appId: 'wx2574b5c5ee8da56b',
					path: 'pages/cashier/cashier',
					extraData: orderParams,
					// envVersion: '',
					success: r => {
					  console.log('跳转到 xunhupay 小程序成功', r)
					  // 成功跳转：标记支付中状态
					},
					fail: e => {
					  // 跳转失败：弹出提示组件引导用户跳转
					  console.log('跳转到 xunhupay 小程序失败 - 准备弹窗提醒跳转', e)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bg {
	  position: fixed;
	  top: 0;
	  left: 0;
	  width: 100vw;
	  height: 100vh;
	
	  background-color: black;
	  opacity: 0.5;
	}
	
	.button {
	  background: none;
	}
	
	.button::after {
	  border: none;
	}
	
	.modal {
	  position: fixed;
	  left: 10vw;
	  top: 30vh;
	  width: 80vw;
	  height: 20vh;
	
	  background-color: white;
	  border-radius: 5rpx;
	
	  text-align: center;
	  line-height: 10vh;
	}
	
	.modal .content {
	  height: 10vh;
	  color: #9d9d9d;
	  font-size: 28rpx;
	}
	
	.modal .button {
	  height: 10vh;
	  color: #3cc51f;
	  font-size: 36rpx;
	}
</style>
