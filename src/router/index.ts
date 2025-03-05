import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DefaultLayout from '../components/layout/default.vue'
import FullScreenLayout from '../components/layout/fullScreen.vue'
import { generateComponentRoutes } from '@/utils/route'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      name: 'bigScreen',
      path: '/bigScreen',
      component: () => import('../views/bigScreen/index.vue'),
      meta:{layout: 'default'}
    },
    {
      path: '/three',
      name: 'three',
      children:[
        ...generateComponentRoutes('three', 10),
        {
        name: 'house',
        path: 'house',
        component: () => import('../views/house.vue'),
        meta: { layout: 'default' }
        }
      ]
    },
    {
      path: '/cesium',
      name: 'cesium',
      children: [
        ...generateComponentRoutes('cesium', 6),
      ]
    },

    {
      path: '/',
      redirect: '/three/three1',
      meta: { layout: 'default' }
    },

  ],
})
router.beforeEach((to, from, next) => {
  const layout = to.meta.layout || 'default';
  const layoutComponent = layout === 'default' ? DefaultLayout : FullScreenLayout;
  // 这里可以根据需要做一些其他处理
  next();
});
export default router
