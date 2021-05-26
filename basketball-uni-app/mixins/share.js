import { mapGetters, mapActions } from 'vuex'
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
	onShow: function() {
		// 隐藏首页按钮
		uni.hideHomeButton()
	},
	onLoad: function(params) {
		if(params.share) {
			this.shared.nickName = params.nickName
			this.getShareInfo(this.shared)
		}
	},
	// custom share data when user share.
	onShareAppMessage: function(res) {
		return {
		  title: '快来一起组队吧',
		  imageUrl: '/static/imgs/share_cover.png',
		  path: `/pages/index/index?nickName=${this.userInfo.nickName}&share=true`
		}
	},
	methods: {
		...mapActions([
		  'getShareInfo', 
		]),
	}
}