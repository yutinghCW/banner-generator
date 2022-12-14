import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/EditorialView.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/HomeView.vue'),
        meta: {
          title: '天下社群圖卡產生器',
        },
      },
      {
        path: 'weekly',
        component: () => import('../views/WeeklyView.vue'),
        meta: {
          title: '一週大事圖卡產生器',
        },
      },
      {
        path: 'cwef',
        component: () => import('../views/CwefView.vue'),
        meta: {
          title: 'CWEF 裁圖工具',
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('../views/ErrorView.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
