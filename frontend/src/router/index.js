import { createRouter, createWebHistory } from 'vue-router';


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
            }


        ]
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
    mode: 'history',
});


export default router;
