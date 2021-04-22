import { createRouter, createWebHistory } from 'vue-router';
import Landing from '@/views/Landing.vue';
import Auth from '@/views/Auth.vue';
import NotFound from '@/views/NotFound';

const routes = [
  { path: '/', name: 'home', component: Landing, meta: { title: 'Főoldal' } },
  { path: '/auth', name: 'auth', component: Auth, props: true, meta: { title: 'Bejelentlkezés' } },
  { path: '/:notFound(.*)', name: 'notfound', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(function(to, from, next) {
  document.title = to.meta.title ? to.meta.title + ' | Quizy' : 'Quizy';
  next();
});

export default router;
