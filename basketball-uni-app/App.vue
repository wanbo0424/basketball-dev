
<script>
	import { mapMutations } from 'vuex'
	import http from './api/index.js'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// uniCloud.callFunction({
			// 	name: 'create-ticket'
			// }).then((res) => {
			// 	console.log(res)
			// 	debugger
			// })
		},
		onShow: function() {
			console.log('App Show')
			// 3e9c3da492abdbad0e1cee5a310646e9  AppSecret
			// wx3bd5737539be2537  AppID
			// 登录
			const _this = this
			uni.login({
			  provider: 'weixin',
			  success: async function (res) {
			    console.log('code', res.code)
				http.get('weapp/login', {params:{ code: res.code }}).then(res => {
					_this.SET_USER_INFO({openId: res.data.data.openid})
				})
				}
			})
			// wx.login({
			//   success (res) {
			//     if (res.code) {
			// 		console.log(res.code)
			//       //发起网络请求
			//       // wx.request({
			//       //   url: 'https://test.com/onLogin',
			//       //   data: {
			//       //     code: res.code
			//       //   }
			//       // })
			//     } else {
			//       console.log('登录失败！' + res.errMsg)
			//     }
			//   }
			// })
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			...mapMutations([
			  'SET_USER_INFO' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
			]),
		},
	}
	
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
