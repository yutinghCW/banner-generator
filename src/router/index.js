import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import WeeklyView from '../views/WeeklyView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/weekly',
    name: 'weekly',
    component: WeeklyView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
