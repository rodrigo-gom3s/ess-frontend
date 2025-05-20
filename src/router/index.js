import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/components/login/Login.vue'
import SelectCluster from '@/components/login/SelectCluster.vue'
import { useAuthStore } from '@/stores/auth'
import Register from '@/components/register/Register.vue'


let firstLogin = true


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/cluster',
      name: 'cluster',
      component: SelectCluster,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    }
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (firstLogin) {
    firstLogin = false
    authStore.restoreLogin()

  }

  if (to.name === 'register'){
    next()
  }
  if (to.name !== 'login' && !authStore.isAuthenticated()) {
    next('/login');
  } else {
    next();
  }
});

export default router
