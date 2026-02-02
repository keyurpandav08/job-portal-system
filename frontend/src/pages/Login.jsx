import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import api from '../services/api';
import './Auth.css';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const toast = useToast();

    // Check if we were redirected with a message (e.g., from Register)
    const [message, setMessage] = useState(location.state?.message || '');

    // Show success message as toast if present
    useEffect(() => {
        if (message) {
            toast.success(message);
            // Clear the message from location state
            window.history.replaceState({}, document.title);
        }
    }, [message, toast]);

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Basic validation
        if (!formData.username.trim()) {
            toast.warning('Please enter your username');
            setLoading(false);
            return;
        }

        if (!formData.password) {
            toast.warning('Please enter your password');
            setLoading(false);
            return;
        }

        try {
            // Spring Security formLogin expects x-www-form-urlencoded body
            const params = new URLSearchParams();
            params.append('username', formData.username);
            params.append('password', formData.password);

            // Simple Axios POST now works because Backend allows CORS.
            // Credentials (Cookies) are handled automatically by withCredentials: true in api.js
            await api.post('/login', params, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });

            // Login Success (Backend status 200 or 302 handled by Axios usually)

            // Fetch Profile
            // Fetch Profile using the new endpoint
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
                console.error("Profile fetch failed", profileErr);
                login({ username: formData.username, role: { name: 'APPLICANT' } });
                toast.success('Login successful!');
                navigate('/dashboard');
            }

        } catch (err) {
            console.error(err);
            if (err.response?.status === 401) {
                toast.error('Invalid username or password');
            } else if (err.response?.status === 429) {
                toast.warning('Too many login attempts. Please try again later');
            } else if (err.code === 'ECONNABORTED' || err.code === 'ERR_NETWORK') {
                toast.error('Unable to connect to server. Please try again');
            } else {
                toast.error('Login failed. Please try again');
            }
            setError('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container py-5">
            <div className="register-card p-4 p-md-5" style={{ maxWidth: '480px' }}>
                <div className="register-header mb-4">
                    <div className="icon-wrapper-large">
                        <LogIn size={32} />
                    </div>
                    <h2 className="fw-bold text-slate-900 mb-2">Welcome Back</h2>
                    <p className="text-secondary small">Sign in to access your professional dashboard</p>
                </div>

                {error && (
                    <div className="alert alert-danger d-flex align-items-center gap-2 mb-4 p-3 rounded-3 border-0" role="alert">
                        <small className="fw-semibold">{error}</small>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label-custom">Username</label>
                        <div className="input-group-custom">
                            <User size={20} className="input-icon-absolute" />
                            <input
                                type="text"
                                name="username"
                                className="form-control-custom"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                            <label className="form-label-custom mb-0">Password</label>
                            <Link to="/forgot-password" style={{ fontSize: '0.8rem' }} className="text-primary fw-semibold text-decoration-none">Forgot password?</Link>
                        </div>
                        <div className="input-group-custom">
                            <Lock size={20} className="input-icon-absolute" />
                            <input
                                type="password"
                                name="password"
                                className="form-control-custom"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-submit-custom d-flex align-items-center justify-content-center gap-2"
                    >
                        {loading ? 'Authenticating...' : <><LogIn size={20} /> Sign In</>}
                    </button>
                </form>

                <p className="text-center mt-4 text-secondary small">
                    Don't have an account? <Link to="/register" className="text-primary fw-bold text-decoration-none">Create free account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
