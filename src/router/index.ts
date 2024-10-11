import Auth from '@/pages/auth.vue';
import Index from '@/pages/index.vue';
import Register from '@/pages/register.vue';
import Test from '@/pages/test.vue';
import Selections from '@/pages/sections/index.vue';
import Selection from '@/pages/sections/_id.vue';
import { LOCAL_STORAGE_KEYS } from '@/utils/constants/localStorage';
import { useLocalStorage } from '@vueuse/core';
import { createRouter, createWebHistory } from 'vue-router';

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
});
// router.beforeEach((to, _, next) => {
//   const authenticated = useLocalStorage<boolean>(
//     LOCAL_STORAGE_KEYS['authenticated'],
//     false,
//   );

//   if (to.name === 'Auth') {
//     authenticated.value = false;
//   }

//   if (to.meta.requiresAuth && !authenticated.value) {
//     return next('/auth');
//   }

//   return next();
// });

export default router;
