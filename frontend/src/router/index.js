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
                path: '/genre/:name',
                name: 'GenrePage',
                component: () => import('../components/GenrePage.vue'),
                props: true,
                meta: { breadcrumb: 'Genre', title: 'Genre' }
            },
            {
                path: '/books',
                name: 'StorePage',
                component: () => import('../components/StorePage/index.vue'),
                meta: { breadcrumb: 'Books', title: 'Books' }
            },
            {
                path: '/book/:id',
                name: 'BookDetail',
                component: () => import('../components/BookDetail/index.vue'),
                props: true

            },
            {
                path: '/:catchAll(.*)', // Catch-all route for undefined paths
                name: 'NotFound',
                component: () => import('../components/404Page.vue'),
                meta: { breadcrumb: '404', title: '404' }
            },
            {
                path: '/admin',
                component: () => import('../components/AdminDashboard/AdminLogin.vue'),
                meta: { breadcrumb: 'Admin Login', title: 'Admin Login' }
            },
            {
                path: '/password-reset',
                component: () => import('../components/AdminDashboard/RequestPasswordReset.vue'),
                meta: { breadcrumb: 'Reset Password', title: 'Reset Password' }
            },
            {
                path: '/admin/reset',
                component: () => import('../components/AdminDashboard/ResetPassword.vue'),
                meta: { breadcrumb: 'Reset Password', title: 'Reset Password' }
            },

        ]
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
                component: () => import('../components/AdminDashboard/index.vue'),
                meta: { breadcrumb: 'Dashboard', title: 'Dashboard' }
            },

            {
                path: '/admin-profile',
                component: () => import('../components/AdminDashboard/AdminProfile.vue'),
                meta: { breadcrumb: 'Profile', title: 'Profile' }
            },
            {
                path: '/admin-settings',
                component: () => import('../components/AdminDashboard/AdminSettings.vue'),
                meta: { breadcrumb: 'Settings', title: 'Settings' }
            }, {
                path: '/users',
                component: () => import('../components/AdminDashboard/NewUsers.vue'),
                meta: { breadcrumb: 'Users', title: 'Users' }
            },
            {
                path: '/orders',
                component: () => import('../components/AdminDashboard/NewOrders.vue'),
                meta: { breadcrumb: 'Orders', title: 'Orders' }
            },
            {
                path: '/transactions',
                component: () => import('../components/AdminDashboard/TransactionSummary.vue'),
                meta: { breadcrumb: 'Transactions', title: 'Transactions' }
            },
            {
                path: '/uploads',
                component: () => import('../components/AdminDashboard/BookUpload.vue'),
                meta: { breadcrumb: 'Uploads', title: 'Uploads' }
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
