import { mapGetters } from 'vuex'
export default {
	data() {
		return {
			// 页面路由参数
			shared: {
				nickName: ''
			}
		}
	},
	computed:{
		...mapGetters([
		  'userInfo',
		])
	},
	onLoad: function(params) {
		if(params.share) {
			this.shared.nickName = params.nickName
		}
	},
	// custom share data when user share.
	onShareAppMessage: function(res) {
		return {
		  title: '快来一起组队吧',
		  imageUrl: '/static/imgs/share_cover.png',
		  path: `/pages/messageForm/index?nickName=${this.userInfo.nickName}&share=true`
		}
	},
}