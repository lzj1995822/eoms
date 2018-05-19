import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/Home'
import Test from '@/components/Test'
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
      path: '/test',
      name: 'test',
      component: Test
    }
  ]
})
