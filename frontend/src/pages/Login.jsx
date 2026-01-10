import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, Lock, LogIn } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Spring Security x-www-form-urlencoded logic
            const params = new URLSearchParams();
            params.append('username', formData.username);
            params.append('password', formData.password);

            await api.post('/login', params, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });

            // Fetch Profile
            try {
                const userRes = await api.get(`/users/username/${formData.username}`);
                const currentUser = userRes.data;

                login({
                    id: currentUser.id,
                    username: currentUser.username,
                    role: { name: currentUser.roleName }
                });
                toast.success(`Welcome back, ${currentUser.username}!`);
                navigate('/dashboard');
            } catch (profileErr) {
                login({ username: formData.username, role: { name: 'APPLICANT' } });
                navigate('/dashboard');
            }
        } catch (err) {
            toast.error('Invalid username or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="bg-white p-4 p-md-5 rounded-4 border border-slate-200 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
                <div className="text-center mb-4">
                    <h2 className="fw-bold text-slate-900">Sign In</h2>
                    <p className="text-muted small">Access your professional dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                    <div>
                        <label className="form-label fw-semibold small text-slate-700">Username</label>
                        <div className="input-group">
                            <span className="input-group-text bg-light border-slate-200"><User size={18} className="text-muted" /></span>
                            <input
                                type="text"
                                name="username"
                                className="form-control border-slate-200"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="form-label fw-semibold small text-slate-700">Password</label>
                        <div className="input-group">
                            <span className="input-group-text bg-light border-slate-200"><Lock size={18} className="text-muted" /></span>
                            <input
                                type="password"
                                name="password"
                                className="form-control border-slate-200"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="btn btn-primary w-100 py-3 fw-bold mt-2">
                        {loading ? 'Authenticating...' : <><LogIn size={18} className="me-2" /> Sign In</>}
                    </button>
                </form>

                <p className="text-center mt-4 text-muted small">
                    New here? <Link to="/register" className="text-primary fw-bold text-decoration-none">Create an account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;