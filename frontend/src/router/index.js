import { createRouter, createWebHistory } from 'vue-router';
import authService from '@/auth/authService';

const routes = [
    {
        path: '/',
        component: () => import('../components/PageLayout.vue'),
        children: [
            {
                path: '',
                component: () => import('../components/HomePage.vue'),
                meta: { breadcrumb: 'Home', title: 'Home' }
            },

            {
                path: '/search',
                name: 'SearchResult',
                component: () => import('../components/SearchResults'),
                meta: { breadcrumb: 'Search Result', title: 'SearchResult' }
            },
            {
                path: '/about',
                name: 'AboutUs',
                component: () => import('../components/AboutUs.vue'),
                meta: { breadcrumb: 'About Us', title: 'About Us' }
            },
            {
                path: '/contact',
                name: 'ContactUs',
                component: () => import('../components/ContactUs.vue'),
                meta: { breadcrumb: 'Contact Us', title: 'Contact Us' }
            },
            {
                path: '/login',
                name: 'LoginPage',
                component: () => import('../components/UserAuthentication/LoginPage.vue'),
                meta: { breadcrumb: 'Login', title: 'Login' }
            },
            {
                path: '/sign-up',
                name: 'RegisterPage',
                component: () => import('../components/UserAuthentication/RegisterPage.vue'),
                meta: { breadcrumb: 'Sign Up', title: 'Sign Up' }
            },
            {
                path: '/reset-password',
                name: 'ForgotPassword',
                component: () => import('../components/UserAuthentication/ForgotPassword.vue'),
                meta: { breadcrumb: 'Reset Password', title: 'Reset Password' }
            },

            {
                path: '/faq',
                name: 'FAQPage',
                component: () => import('../components/FAQPage.vue'),
                meta: { breadcrumb: 'FAQ', title: 'FAQ' }
            },
            {
                path: '/:catchAll(.*)', // Catch-all route for undefined paths
                name: 'NotFound',
                component: () => import('../components/404Page.vue'),
                meta: { breadcrumb: 'FAQ', title: 'FAQ' }
            },


        ]
    },
    {
        path: '/admin',
        component: () => import('../components/AdminDashboard/AdminLogin.vue')
    },

    {
        path: '/adminpage/dashboard',
        component: () => import('../components/AdminDashboard/index.vue'),
        beforeEnter: (to, from, next) => {
            // Check if the user is authenticated
            if (authService.isAuthenticated()) {
                // Clear the logout timer when navigating to a new route
                authService.clearLogoutTimer();
                // User is authenticated, proceed to the admin page
                next();
            } else {
                // User is not authenticated, replace the history entry with the login page
                next({ path: '/admin', replace: true });
            }
        },

        children: [
            {
                path: '',
                component: () => import('../components/AdminDashboard/index.vue')
            },

            {
                path: '/admin-profile',
                component: () => import('../components/AdminDashboard/AdminProfile.vue')
            },
            {
                path: '/admin-settings',
                component: () => import('../components/AdminDashboard/AdminSettings.vue')
            }, {
                path: '/users',
                component: () => import('../components/AdminDashboard/NewUsers.vue')
            },
            {
                path: '/orders',
                component: () => import('../components/AdminDashboard/NewOrders.vue')
            },
            {
                path: '/transactions',
                component: () => import('../components/AdminDashboard/TransactionSummary.vue')
            },
            {
                path: '/uploads',
                component: () => import('../components/AdminDashboard/BookUpload.vue')
            },
        ]

    }

]

const router = createRouter({
    history: createWebHistory(),
    routes,
    mode: 'history',
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'EduReads254';
    next();
});

export default router;
