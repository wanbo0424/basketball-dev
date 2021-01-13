import Vue from 'vue'
import App from './App'
import uView from 'uview-ui';
Vue.use(uView);
Vue.config.productionTip = false
// @import 'uview-ui/theme.scss';
App.mpType = 'app'
import store from './store'  

const app = new Vue({
	store,
	...App
})
app.$mount()
