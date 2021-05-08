import Vue from 'vue'
import App from './App'
import uView from 'uview-ui';
Vue.use(uView);
Vue.config.productionTip = false

// @import 'uview-ui/theme.scss';
App.mpType = 'app'
import store from './store'  
// import bcc from "./common/js/base-cloud-client.js" //引入客户端sdk文件
// Vue.prototype.bcc = bcc ; //注册为全局对象

Vue.prototype.$apuDomain = 'http://39.101.161.231/'
const app = new Vue({
	store,
	...App
})
app.$mount()
