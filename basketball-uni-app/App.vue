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
		},
		onShow: function() {
			// 隐藏首页按钮
			uni.hideHomeButton()
		},
		
		onLaunch: function() {
		},
		onShow: function() {
			
			// 8eae0891e063bca56590224254363fcc  AppSecret
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
			wx.showShareMenu({
			  withShareTicket: true,
			  menus: ['shareAppMessage', 'shareTimeline'],
			  success: function(res)  {
				  console.log(res, 'share')
			  }
			})
			
			
			// wx.getShareInfo({
			// 	success: function(res) {
			// 		console.log(res, '获取分享信息')
			// 	}
			// })
			// uni.showShareMenu({
			// 	withShareTicket: true
			// })
		},
		
		onHide: function() {
		},
		methods: {
			...mapMutations([
			  'SET_USER_INFO' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
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
