import { mapGetters } from 'vuex'
export default {
	data() {
		return {
			// 页面路由参数
			routeParams: {
				
			}
		}
	},
	computed:{
		...mapGetters([
		  'userInfo',
		])
	},
	// onLoad: function(params) {
	// 	this.routeParams = params
	// 	console.log(this.routeParams)
	// },
	// custom share data when user share.
	onShareAppMessage: function(res) {
		return {
		  title: '快来一起组队吧',
		  imageUrl: '/static/imgs/share_cover.png',
		  path: `/pages/messageForm/index?nickName=${this.userInfo.nickName}&share=true`
		}
	},
}