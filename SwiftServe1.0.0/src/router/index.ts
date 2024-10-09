import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import HawkerCentrePage from '../views/HawkerCentrePage.vue'
import FoodItemPage from '../views/FoodItemPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    {
      path: '/hawker',
      name: 'hawker',
      component: HawkerCentrePage
    },
    {
      path: '/food-item/:id',
      name: 'FoodItemPage',
      component: FoodItemPage,
      props: true // to pass props via route params
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
