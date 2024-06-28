import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';

// Import CSS files
import './assets/main.css';
import '@fortawesome/fontawesome-free/css/all.css';

import router from './router'


const app = createApp(App);


// Use Axios globally
app.config.globalProperties.$axios = axios;

// Set up the router
app.use(router);

// Mount the app
app.mount('#app');