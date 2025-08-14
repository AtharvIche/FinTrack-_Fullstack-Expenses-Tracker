import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_URL
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// THIS IS THE LINE TO FIX
export const registerUser = (userData) => axios.post(`${API_URL}/auth/register`, userData);
// MAKE SURE THE 'export' KEYWORD IS HERE ^

export const loginUser = (credentials) => axios.post(`${API_URL}/auth/login`, credentials);

export const getExpenses = () => api.get('/expenses');
export const createExpense = (expenseData) => api.post('/expenses', expenseData);


// --- ADD THIS NEW FUNCTION ---
export const deleteExpense = (id) => api.delete(`/expenses/${id}`);

export default api;