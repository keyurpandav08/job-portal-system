import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080', // Direct to backend, no proxy needed with CORS
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true // Important for Cookies
});

// Basic Auth Interceptor removed. We rely on Session Cookies (JSESSIONID) handled by the browser.
// SecurityConfig uses .formLogin(), so we authenticate via POST /login (form-data) and cookie.

export default api;
