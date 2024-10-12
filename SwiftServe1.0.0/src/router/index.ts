import { createRouter, createWebHistory } from 'vue-router';
import HawkerCentrePage from '../views/HawkerCentrePage.vue';
import FoodItemPage from '../views/FoodItemPage.vue';

const routes = [
    {
        path: '/hawker',
        name: 'hawker',
        component: HawkerCentrePage
    },
    {
        path: '/food-item/:id/:name/:price/:stallId',
        name: 'FoodItemPage',
        component: FoodItemPage,
        props: true,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
