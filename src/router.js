import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Menu from './views/Menu.vue'
import ndpage from './components/ndpage.vue'
import whiteshirt from './components/whiteshirt.vue'
import blackshirt from './components/blackshirt.vue'
import cart from './components/cart.vue'
import Admin from './views/Admin.vue'
import Orders from './views/Orders.vue'
import AddNewItems from './components/admin/AddNewItems.vue'
import Login from './components/admin/Login.vue'

import firebase from 'firebase'
import 'firebase/firestore'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/ndpage',
      name: 'ndpage',
      component: ndpage
    },
    {
      path: '/whiteshirt',
      name: 'whiteshirt',
      component: whiteshirt
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/blackshirt',
      name: 'blackshirt',
      component: blackshirt
    },
    {
      path: '/menu',
      name: 'menu',
      component: Menu
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/addnewitems',
      name: 'addnewitems',
      component: AddNewItems,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      redirect: '/'
    },
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else next();
});
export default router
