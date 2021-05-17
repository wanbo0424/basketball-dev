import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({  
    state: {  
        userInfo: {
			avatarUrl: '',
			nickName: ''
		},
    },  
	getters: {
		userInfo: state => {
			return state.userInfo
		},
	},
    mutations: {  
		SET_USER_INFO(state, info) {
			for(let key in info) {
				state.userInfo[key] = info[key]
			}
		}
    },
	actions: {
		async getUserInfo({commit, state}, canToHome) {
			return new Promise(resolve => {
				if(state.userInfo.nickName) {
					resolve('success')
					return
				}
				// 微信官方已废弃getUserInfo方法
				// 	  if (res.authSetting['scope.userInfo']) {
				// 		// 已经授权，可以直接调用 getUserInfo 获取头像昵称
				// 		uni.getUserInfo({
				// 		  withCredentials: false,
				// 		  success: ({ userInfo: info = {} }) => {
				// 			commit('SET_USER_INFO', info)
				// 			// getApp().globalData.userInfo = info;
				// 			// resolve(info);
				// 		  },
				// 		});
				// 	  } else {
				// 		// 未授权，跳转授权页面
				// 		uni.reLaunch({ url: '/pagesA/user/authorize' });
				// 		// reject();
				// 	  }
				uni.getUserProfile({
					desc: '获取昵称为大家更好的技术统计',
					lang: 'zh_CN',
					success: ({userInfo}) => {
						commit('SET_USER_INFO', userInfo)
						resolve('success')
						// if(canToHome) {
						// 	uni.switchTab({url: '/pages/home/index'})
						// }
					},
					complete: () => {
						if(canToHome) {
							uni.switchTab({url: '/pages/home/index'})
						}
					}
				})
			}) 
			
		},
		getLocationInfo() {
			return new Promise(resolve => {
				uni.getSetting({
					success: (res) => {
					  // 获取位置信息
					  if(res.authSetting['scope.userLocation']) {
						  uni.getLocation({
						    withCredentials: false,
						    success: (res) => {
								console.log(res, 'scope.userLocation')
								resolve('success')
						    },
						 });
					  }else{
						  uni.authorize({
						      scope: 'scope.userLocation',
							  success: (res) => {
								  resolve('success')
							  },
						  })
					  }
					},
				 });
			})
		}
	}
})

export default store