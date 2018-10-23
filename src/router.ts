
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import userService from './services/user/user.service';

Vue.use(Router);


const router = new Router({
  mode: "history",
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/overview',
      name: 'overview',
      component: () => import(/* webpackChunkName: "overview" */  './views/Overview.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/',
      name: 'home',
      component: Home,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (!userService.isLoggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
