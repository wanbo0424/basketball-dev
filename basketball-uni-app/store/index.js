import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({  
    state: {  
        userInfo: {}
    },  
	getters: {
		userInfo: state => {
			return state.userInfo
		}
	},
    mutations: {  
		SET_USER_INFO(state, info) {
			for(let key in info) {
				state.userInfo[key] = info[key]
			}
		}
    },
	actions: {
		getUserInfo({commit}) {
			uni.getSetting({
				success: (res) => {
				  if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称
					uni.getUserInfo({
					  withCredentials: false,
					  success: ({ userInfo: info = {} }) => {
						commit('SET_USER_INFO', info)
						// getApp().globalData.userInfo = info;
						// resolve(info);
					  },
					});
				  } else {
					// 未授权，跳转授权页面
					uni.reLaunch({ url: '/pages/user/authorize' });
					// reject();
				  }
				  
				  // 获取位置信息
				  // if(res.authSetting['scope.userLocation']) {
					 //  uni.getLocation({
					 //    withCredentials: false,
					 //    success: (res) => {
					 //    },
					 // });
				  // }else{
					 //  uni.authorize({
					 //      scope: 'scope.userLocation',
						//   success: (res) => {
						//   },
					 //  })
				  // }
				},
			  });
		}
	}
})

export default store