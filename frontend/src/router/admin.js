
import { createRouter, createWebHistory } from 'vue-router';
import authService from '@/auth/authService';

const adminroutes = [

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

const adminrouter = createRouter({
    history: createWebHistory(),
    adminroutes,
    mode: 'history',
});

adminrouter.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'EduReads254';
    next();
});

export default adminrouter;

