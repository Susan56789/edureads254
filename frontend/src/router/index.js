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
