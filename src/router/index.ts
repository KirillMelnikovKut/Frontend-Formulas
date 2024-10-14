import Auth from '@/pages/auth.vue';
import Index from '@/pages/index.vue';
import Register from '@/pages/register.vue';
import Tests from '@/pages/tests/index.vue'
import Test from '@/pages/tests/_id.vue';
import Selections from '@/pages/sections/index.vue';
import Selection from '@/pages/sections/_id.vue';
import { LOCAL_STORAGE_KEYS } from '@/utils/constants/localStorage';
import { useLocalStorage } from '@vueuse/core';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
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
    path: '/register',
    meta: { requiresAuth: true },
    component: Register,
  },
  {
    path: '/auth',
    meta: { requiresAuth: true },
    component: Auth,
  },
  {
    path: '/test',
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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      meta: { requiresAuth: true },
      component: Index,
    },
    {
      path: '/register',
      meta: { requiresAuth: true },
      component: Register,
    },
    {
      path: '/auth',
      meta: { requiresAuth: true },
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
  ],




router.beforeEach((to, from, next) => {
  const authenticated = { value: true };

  if (to.meta.requiresAuth && !authenticated.value) {
    if (to.path !== '/auth') {
      return next('/auth');
    }
  }

  if (to.path === '/auth' && authenticated.value) {
    return next('/');
  }

  next();
});


export default router;
