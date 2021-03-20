import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载全局样式
import './styles/index.scss'

Vue.config.productionTip = false
Vue.prototype.$store = store
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
