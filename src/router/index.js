import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/Home'
import login from '@/components/Login'
import TerminalManagement from '@/components/TerminalManagement'
import realtimeBynamic from "@/components/RealtimeDynamic"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[{
          path: '/terminalManagement',
          name: 'TerminalManagement',
          component:TerminalManagement
      },
        {
            path: '/realtimeBynamic',
            name: 'realtimeBynamic',
            component:realtimeBynamic
        }]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
