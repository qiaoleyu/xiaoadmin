import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import adminLogin from '@/components/adminLogin'
import  admin from '@/components/admin'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    }, {
      path: '/adminLogin',
      name: 'adminLogin',
      component: adminLogin
    }, {
      path: '/admin',
      name: 'admin',
      component: admin
    }
  ]
})
