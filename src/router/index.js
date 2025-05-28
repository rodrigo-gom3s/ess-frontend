import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/components/login/Login.vue'
import SelectCluster from '@/components/login/SelectCluster.vue'
import { useAuthStore } from '@/stores/auth'
import Register from '@/components/register/Register.vue'
import Dashboard from '@/components/dashboard/Dashboard.vue'
import Cluster from '@/components/cluster/Cluster.vue'
import Vms from '@/components/vms/Vms.vue'
import LiveMigration from '@/components/live-migration/LiveMigration.vue'
import FaultTolerance from '@/components/fault-tolerance/FaultTolerance.vue'


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
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
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
      path: '/ha-cluster',
      name: 'ha-cluster',
      component: Cluster,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/vms',
      name: 'vms',
      component: Vms,
    },
    {
      path: '/live-migration',
      name: 'live-migration',
      component: LiveMigration,
    },
    {
      path: '/fault-tolerance',
      name: 'fault-tolerance',
      component: FaultTolerance,
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
