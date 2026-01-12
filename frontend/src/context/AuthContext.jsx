import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const storedUser = localStorage.getItem('user');
    let initialUser  = null;
    if (storedUser && storedUser !== "undefined") { // Added safety check
        try {
            initialUser= JSON.parse(storedUser);
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            localStorage.removeItem('user'); // Clean up corrupt data
        }
    }
    setUser(initialUser);
    setLoading(false);
}, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = async () => {
        try {
            await api.post('/logout'); // Call backend logout to clear cookie
        } catch (e) {
            console.error("Logout failed", e);
        }
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
