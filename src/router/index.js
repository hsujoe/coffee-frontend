import Vue from 'vue'
import Router from 'vue-router'

// Dashboard Components
import dashboard from '../views/dashboard'

//  Widgets Components
import mainView from '../mainView'

import buttons from '../views/basic-elements/buttons'
import dropdowns from '../views/basic-elements/dropdowns'
import typography from '../views/basic-elements/typography'

// //  Chart Components
import chartjs from '../views/charts/chartjs'

// //  Icons Component/
import mdiIcons from '../views/icons/mdi-icons'

// import login from '../views/samples/user-pages/login'
import register from '../views/samples/user-pages/register'

//  Table Components
import basicTables from '../views/tables/basic-table'
import runShops from '../runShop/runShopList'
import runShopAdd from '../runShop/runShopAdd'
import runShopVE from '../runShop/runShopVE'
import stores from '../stores/storeList'
import storeAdd from '../stores/storeAdd'
import storeVE from '../stores/storeVE'
import coffeeBeans from '../coffeeBeans/coffeeBeanList'
import coffeeBeanAdd from '../coffeeBeans/coffeeBeanAdd'
import coffeeBeanVE from '../coffeeBeans/coffeeBeanVE'
import products from '../products/productList'
import productVE from '../products/productVE'
import productAdd from '../products/productAdd'
import brews from '../brews/brewList'
import brewAdd from '../brews/brewAdd'
import brewVE from '../brews/brewVE'
import login from '../login'
import homePage from '../homePage'
Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  mode: 'hash',
  routes: [{
    path: '/',
    // redirect: '/dashboard',
    redirect: '/pages/login',
    component: mainView,
    main: {
      path: '/pages/login',
      name: 'login',
      component: login
    },
    children: [
      {
        path: '/homePage',
        name: 'homePage',
        component: homePage
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: dashboard
      },
      {
        path: '/runShopList',
        name: 'runShops',
        component: runShops
      },
      {
        path: '/runShopAdd',
        name: 'runShopAdd',
        component: runShopAdd
      },
      {
        path: '/runShopVE/:id',
        name: 'runShopVE',
        component: runShopVE
      },
      {
        path: '/brewList',
        name: 'brews',
        component: brews
      },
      {
        path: '/brewAdd',
        name: 'brewAdd',
        component: brewAdd
      },
      {
        path: '/brewVE/:id',
        name: 'brewVE',
        component: brewVE
      },
      {
        path: '/storeList',
        name: 'stores',
        component: stores
      },
      {
        path: '/storeAdd',
        name: 'storeAdd',
        component: storeAdd
      },
      {
        path: '/storeVE/:id',
        name: 'storeVE',
        component: storeVE
      },
      {
        path: '/coffeeBeanList',
        name: 'coffeeBeans',
        component: coffeeBeans
      },
      {
        path: '/coffeeBeanAdd',
        name: 'coffeeBeanAdd',
        component: coffeeBeanAdd
      },
      {
        path: '/coffeeBeanVE/:id',
        name: 'coffeeBeanVE',
        component: coffeeBeanVE
      },
      {
        path: '/productList',
        name: 'products',
        component: products
      },
      {
        path: '/productAdd',
        name: 'productAdd',
        component: productAdd
      },
      {
        path: '/productVE/:id',
        name: 'productVE',
        component: productVE
      },
      {
        path: '/buttons',
        name: 'buttons',
        component: buttons
      },
      {
        path: '/dropdowns',
        component: dropdowns
      },
      {
        path: '/typography',
        component: typography
      },
      {
        path: '/chartjs',
        component: chartjs
      },
      {
        path: '/mdiIcons',
        component: mdiIcons
      },
      {
        path: '/basic_table',
        name: 'basicTables',
        component: basicTables
      }
    ]
  },
  {
    path: '*',
    redirect: '/pages/error_404',
    component: {
      render (c) { return c('router-view') }
    },
    children: [
      {
        path: '/pages/login',
        component: login
      },
      {
        path: '/pages/register',
        component: register
      }
    ]}
  ]
})
