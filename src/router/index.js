import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import adminLogin from '@/components/adminLogin'
import admin from '@/components/admin'
import shops from '@/components/shops'
import addShops from '@/components/addShops'
import updateShops from '@/components/updateShops'
import showKinds from '@/components/showKinds'
import addShopKinds from '@/components/addShopKinds'
import updateShopKinds from '@/components/updateShopKinds'

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
    },{
      path: '/shops',
      name: 'shops',
      component: shops,
  },{
      path: '/addShops',
      name: 'addShops',
      component: addShops
      },{
      path: '/updateShops/:shopId',
      name: 'updateShops',
      component: updateShops
    },{
      path: '/showKinds',
      name: 'showKinds',
      component: showKinds
    },{
      path: '/addShopKinds',
      name: 'addShopKinds',
      component: addShopKinds
    },{
      path: '/updateShopKinds/:skId',
      name: 'updateShopKinds',
      component: updateShopKinds
    }
  ]
})
