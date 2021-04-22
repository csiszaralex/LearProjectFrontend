import { createRouter, createWebHistory } from 'vue-router';
import Landing from '@/views/Landing.vue';
import Auth from '@/views/Auth.vue';
import Home from '@/views/Home.vue';
import NotFound from '@/views/NotFound';
import store from '@/store';

const routes = [
  { path: '/', name: 'landing', component: Landing, meta: { title: 'Főoldal', role: 0 } },
  { path: '/auth', name: 'auth', component: Auth, meta: { title: 'Bejelentlkezés', role: 0 } },
  { path: '/home', name: 'home', component: Home, meta: { title: 'Főoldal', role: 1 } },
  { path: '/:notFound(.*)', name: 'notfound', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(function(to, from, next) {
  document.title = to.meta.title ? to.meta.title + ' | Quizy' : 'Quizy';
  if (typeof to.meta.role === 'number') {
    const myRole = store.getters.getRole;
    if (to.meta.role === 0 && myRole > 0) {
      router.replace('/home');
    } else if (to.meta.role !== 0 && to.meta.role > myRole) {
      router.replace(`/auth?redirect=${to.fullPath.substring(1)}`);
    }
  }
  next();
});

export default router;
