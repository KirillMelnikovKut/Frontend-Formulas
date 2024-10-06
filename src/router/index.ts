import Auth from '@/pages/auth.vue'
import Index from '@/pages/index.vue'
import Register from '@/pages/register.vue'
import Test from '@/pages/test.vue'
import Selections from '@/pages/sections/index.vue'
import Selection from '@/pages/sections/_id.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{ path: '/', component: Index },
		{ path: '/register', component: Register },
		{ path: '/auth', component: Auth },
		{ path: '/test', component: Test },
		{ path: '/sections', component: Selections },
		{ path: '/sections/:id', component: Selection },
	]
})

export default router
