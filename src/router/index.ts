import Auth from '@/pages/auth.vue';
import Index from '@/pages/index.vue';
import Register from '@/pages/register.vue';
import Tests from '@/pages/tests/index.vue';
import Test from '@/pages/tests/_id.vue';
import Selections from '@/pages/sections/index.vue';
import Selection from '@/pages/sections/_id.vue';
import theory from '@/pages/theory.vue';
import theorySection from '@/pages/theorySection.vue';
import ResultsPage from '@/pages/results/ResultsPage.vue';
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    meta: { requiresAuth: true },
    component: Index,
  },
  {
    path: '/theory',
    meta: { requiresAuth: true },
    component: theory,
  },
  {
    path: '/theory/:id',
    meta: { requiresAuth: true },
    component: theorySection,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/auth',
    component: Auth,
  },
  {
    path: '/test',
    meta: { requiresAuth: true },
    component: Tests,
  },
  {
    path: '/test/:id',
    meta: { requiresAuth: true },
    component: Test,
  },
  {
    path: '/sections',
    meta: { requiresAuth: true },
    component: Selections,
  },
  {
    path: '/sections/:id',
    meta: { requiresAuth: true },
    component: Selection,
  },
  {
    path: '/results',
    meta: { requiresAuth: true },
    component: ResultsPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('authenticated') === 'true';

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/auth');
  }

  if (to.path === '/auth' && isAuthenticated) {
    return next('/');
  }

  next();
});


export default router;
