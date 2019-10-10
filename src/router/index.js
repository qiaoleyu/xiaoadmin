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
import administrator from '@/components/administrator'
import updateAdmin from '@/components/updateAdmin'
import addAdmin from '@/components/addAdmin'


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
      component: admin,
      children:[
        {path: '/administrator', name: '查管理员', component: administrator},
        {path: '/addAdmin', name: '添管理员', component: addAdmin},
        {path: '/updateAdmin/:id', name: '改管理员', component: updateAdmin},
        {path: '/shops', name: '商品管理', component: shops},
        {path: '/addShops', name: '添加商品', component: addShops},
        {path: '/updateShops/:shopId', name: '修改商品', component: updateShops},
        {path: '/showKinds', name: '类别管理', component: showKinds},
        {path: '/addShopKinds', name: '添加类别', component: addShopKinds},
        {path: '/updateShopKinds/:skId', name: '修改类别 ', component: updateShopKinds},
      ]
    }
  ]
})
