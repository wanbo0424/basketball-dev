<template>
	<view>
		<button type="primary" open-type="share"></button>
	</view>
</template>
<script>
	import { mapMutations, mapActions, mapGetters } from 'vuex'
	import http from './api/index.js'
	
	export default {
		data() {
			return {
			}
		},
		created() {
			this.getUserInfo()
		},
		
		
		onLaunch: function() {
			// uniCloud.callFunction({	
			// 	name: 'create-ticket'
			// }).then((res) => {
			// 	console.log(res)
			// 	debugger
			// })
		},
		onShow: function() {
			
			// 3e9c3da492abdbad0e1cee5a310646e9  AppSecret
			// wx3bd5737539be2537  AppID
			// 登录
			const _this = this
			uni.login({
			  provider: 'weixin',
			  success: async function (res) {
				http.get('weapp/login', {params:{ code: res.code }}).then(res => {
					_this.SET_USER_INFO({openId: res.data.data.openid})
				})
				}
			})
			// 分享给朋友
			// wx.showShareMenu({
			//   withShareTicket: true,
			//   menus: ['shareAppMessage', 'shareTimeline'],
			//   success: function(res)  {
			// 	  console.log(res, 'share')
			//   }
			// })
			
			// wx.getShareInfo({
			// 	success: function(res) {
			// 		console.log(res, '获取分享信息')
			// 	}
			// })
			uni.showShareMenu({
				withShareTicket: true
			})
		},
		
		onHide: function() {
		},
		methods: {
			...mapMutations([
			  'SET_USER_INFO' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
			]),
			...mapActions([
			  'getUserInfo', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
			]),
			
			share() {
				console.log('nickName',this.userInfo.nickName )
			}
		},
	}
	
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "./static/css/iconfont.css";
	@import "uview-ui/index.scss";
</style>
