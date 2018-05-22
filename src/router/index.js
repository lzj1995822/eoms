import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/Home'
import login from '@/components/Login'
import TerminalManagement from '@/components/TerminalManagement'
import realtimeBynamic from "@/components/RealtimeDynamic"
import dashbord from '@/components/Dashbord'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {
        requireAuth: true
      },
      component: Home,
      children:[{
            path: '/dashbord',
            name: 'dashbord',
            component: dashbord
        },
        {
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
