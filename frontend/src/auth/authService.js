import axios from 'axios';

const API_URL = 'http://localhost:5000';

let logoutTimer;

const startLogoutTimer = (logoutCallback, duration) => {
    logoutTimer = setTimeout(() => {
        logoutCallback();
    }, duration);
};

const clearLogoutTimer = () => {
    if (logoutTimer) {
        clearTimeout(logoutTimer);
    }
};

const login = (credentials) => {
    return axios.post(`${API_URL}/api/auth/login`, credentials)
        .then((response) => {
            const data = response.data;

            if (data.success) {
                const token = data.token;

                // Save the token to local storage
                localStorage.setItem('token', token);

                // Include the token in the headers for subsequent requests
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                // Start the logout timer after successful login 
                startLogoutTimer(logout, 240000); // 240,000 milliseconds = 4 minutes
            }

            return data;
        })
        .catch((error) => {
            console.error('Login error:', error);
            throw error;
        });
};

const logout = () => {
    // Clear the token from local storage on logout
    localStorage.removeItem('token');

    // Remove the authorization header
    delete axios.defaults.headers.common['Authorization'];

    // Clear the logout timer
    clearLogoutTimer();
};

const isAuthenticated = () => {
    // Check if a valid token is present in local storage
    const token = localStorage.getItem('token');
    return !!token;
};

export default {
    login,
    logout,
    isAuthenticated,
    clearLogoutTimer,
};
