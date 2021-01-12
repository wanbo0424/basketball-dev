<script>
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
			
			wx.login({
			  success (res) {
			    if (res.code) {
					console.log(res.code)
			      //发起网络请求
			      // wx.request({
			      //   url: 'https://test.com/onLogin',
			      //   data: {
			      //     code: res.code
			      //   }
			      // })
			    } else {
			      console.log('登录失败！' + res.errMsg)
			    }
			  }
			})
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
	
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
