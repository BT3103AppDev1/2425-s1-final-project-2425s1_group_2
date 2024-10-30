import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Fig3_HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Fig4_SignUpView.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Fig5_LoginView.vue')
    },
    {
      path: '/profile',
      name: 'profilePage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Fig6_ProfileView.vue')
    },
    {
      path: '/merchantprofile',
      name: 'merchantProfilePage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Fig6_MerchantProfileView.vue')
    },
    {
      path: '/custD',
      name: 'customerDashboard',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Fig7_CustDashView.vue')
    },
    {
      path: '/diningOptions',
      name: 'diningOptions',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Fig8_DiningOptionsView.vue')
    },
    {
      //change to Fig 9
      path: '/food-item/:id?/:cartItemId?/:orderId?',
      name: 'foodItemPage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Fig10_FoodItemPage.vue')
    },
    {
      //change to Fig 10
      path: '/hawkerCentre',
      name: 'hawkerCentrePage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Fig9_HawkerCentrePage.vue')
    },
    {
      path: '/checkout',
      name: 'checkoutPage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Fig11_CheckoutView.vue')
    },
    {
      path: '/takeawaySuccess',
      name: 'takeawaySuccessPage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Fig12.1_PaymentSuccessTakeaway.vue')
    },
    {
      path: '/paymentSuccess',
      name: 'paymentSuccessPage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Fig12_PaymentSuccessView.vue')
    },
    {
      path: '/seatBooking',
      name: 'seatBookingPage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Fig13_SeatBookingView.vue')
    },
    {
      path: '/livereceipt',
      name: 'liveReceiptPage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Fig14_LiveReceiptView.vue')
    },
    {
      path: '/merchantToggleAvailability',
      name: 'merchantToggleAvailabilityPage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Fig16_MerchantToggleAvailabilityPage.vue')
    },
    {
      path: '/merchantOrders',
      name: 'merchantOrdersPage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Fig17_MerchantOrdersView.vue')
    },
    {
      path: '/merchantFoodItemForm',
      name: 'merchantAddOrderPage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MerchantAddOrderPage.vue')
    },
    {
      path: '/merchantDashboard',
      name: 'merchantDashboardPage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Fig15_MerchantDashboardView.vue')
    },
    {
      path: '/merchantSales',
      name: 'merchantSalesDashboardPage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Fig18_MerchantSalesDashboardView.vue')
    },
    {
      path: '/resetPassword',
      name: 'resetPassword',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Fig19_ResetPasswordView.vue')
    }
  ]
})

export default router
