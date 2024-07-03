import axios from 'axios';

const API_URL = 'https://edureads254.onrender.com';

const getOrderListByEmail = (email) => {
    return axios.get(`${API_URL}/api/orders/email/${encodeURIComponent(email)}`)
        .then(response => {
            return response.data; // Assuming your backend returns the orders data in JSON format
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
            throw error; // Propagate the error to the caller
        });
};

export default {
    getOrderListByEmail
};