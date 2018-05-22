// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import Element from 'element-ui'
import Vuex from "vuex"

Vue.use(Element, { size: 'small' })
Vue.use(Vuex)
Vue.config.productionTip = false
console.log("..",router)


router.beforeEach((to, from, next) => {
    if (!sessionStorage.getItem("token") && to.path != "/login") {  // 通过vuex state获取当前的token是否存在
        next( {path: '/login'});
    }
    else {
        next()
    }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


