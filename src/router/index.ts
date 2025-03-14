import Auth from '@/pages/auth.vue';
import Index from '@/pages/index.vue';
import Register from '@/pages/register.vue';
import Tests from '@/pages/tests/index.vue';
import Test from '@/pages/tests/_id.vue';
import NewTest from '@/pages/new-test/_id.vue';
import Selections from '@/pages/sections/index.vue';
import Selection from '@/pages/sections/_id.vue';
import theory from '@/pages/theory.vue';
import theorySection from '@/pages/theorySection.vue';
import ResultsPage from '@/pages/results/ResultsPage.vue';
import VideoPage from '@/pages/video/VideoPage.vue';
import Intro from '@/pages/intro/intro.vue';
import UserProfilePage from '@/pages/UserProfilePage.vue';
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router';
import { LOCAL_STORAGE_KEYS } from '@/utils/constants/localStorage';
import { useLocalStorage } from '@vueuse/core';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    meta: { requiresAuth: true },
    component: Index,
  },
  {
    path: '/intro',
    meta: { requiresAuth: true },
    component: Intro,
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
    path: '/new-test/:id',
    meta: { requiresAuth: true },
    component: NewTest,
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
  {
    path: '/video',
    meta: { requiresAuth: true },
    component: VideoPage,
  },
  {
    path: '/profile',
    meta: { requiresAuth: true },
    component: UserProfilePage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authenticated = useLocalStorage<boolean>(
    LOCAL_STORAGE_KEYS['authenticated'],
    false,
  );

  if (to.name === 'Auth') {
    authenticated.value = false;
  }

  if (to.meta.requiresAuth && !authenticated.value) {
    return next('/auth');
  }

  return next();
});

export default router;
