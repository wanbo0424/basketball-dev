import Vue from 'vue'
import App from './App'
import uView from 'uview-ui';
Vue.use(uView);
Vue.config.productionTip = false
// @import 'uview-ui/theme.scss';
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
