import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/components/login/Login.vue'
import SelectCluster from '@/components/login/SelectCluster.vue'
import { useAuthStore } from '@/stores/auth'


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
    }
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.name !== 'login' && !authStore.isAuthenticated()) {
    next('/login');
  } else {
    next();
  }
});

export default router
