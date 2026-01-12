import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    User,
    UserPlus,
    Mail,
    Lock,
    Phone,
    Briefcase,
    Wrench,
    ShieldCheck,
    Building2
} from 'lucide-react';
import toast from 'react-hot-toast'; // Kept for logic, but verified as removed in App.jsx (if using alternative) - assuming user might want it back or using console logs. 
// Ideally we should use the "Toaster" replacement if implemented, but for now we follow the file's logic.
import api from '../services/api';
import './Auth.css';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        fullName: '',
        phone: '',
        skills: '',
        experience: '',
        role: { name: 'APPLICANT' } // UI State
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'role') {
            setFormData(prev => ({ ...prev, role: { name: value } }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            let roleToSend = null;

            if (formData.role.name === 'APPLICANT') {
                // Send null, backend defaults to APPLICANT
                roleToSend = null;
            } else {
                roleToSend = { id: 2, name: 'EMPLOYER' };
            }

            const payload = {
                ...formData,
                role: roleToSend
            };

            await api.post('/users/register', payload);
            // toast.success("Account created successfully!"); 
            console.log("Registration success");
            navigate('/login', { state: { message: 'Registration successful! Please login.' } });
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.message || "Registration failed. Please try again.";
            // toast.error(msg);
            alert(msg); // Fallback until toaster is fixed
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container py-5">
            <div className="register-card p-4 p-md-5">
                <div className="register-header">
                    <div className="icon-wrapper-large">
                        <UserPlus size={32} />
                    </div>
                    <h2 className="fw-bold text-slate-900 mb-2">Create Account</h2>
                    <p className="text-secondary small">Join thousands of professionals on CareerLink</p>
                </div>

                {/* Professional Role Toggler */}
                <div className="role-toggle-container mb-4">
                    <button
                        type="button"
                        onClick={() => handleChange({ target: { name: 'role', value: 'APPLICANT' } })}
                        className={`role-toggle-btn ${formData.role.name === 'APPLICANT' ? 'active' : ''}`}
                    >
                        <User size={18} /> Candidate
                    </button>
                    <button
                        type="button"
                        onClick={() => handleChange({ target: { name: 'role', value: 'EMPLOYER' } })}
                        className={`role-toggle-btn ${formData.role.name === 'EMPLOYER' ? 'active' : ''}`}
                    >
                        <Building2 size={18} /> Employer
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        {/* Full Name */}
                        <div className="col-12">
                            <label className="form-label-custom">Full Name</label>
                            <div className="input-group-custom">
                                <User size={20} className="input-icon-absolute" />
                                <input
                                    type="text"
                                    name="fullName"
                                    required
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="form-control-custom"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        {/* Username & Email */}
                        <div className="col-md-6">
                            <label className="form-label-custom">Username</label>
                            <div className="input-group-custom">
                                <ShieldCheck size={20} className="input-icon-absolute" />
                                <input
                                    type="text"
                                    name="username"
                                    required
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="form-control-custom"
                                    placeholder="johndoe"
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label-custom">Email Address</label>
                            <div className="input-group-custom">
                                <Mail size={20} className="input-icon-absolute" />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="form-control-custom"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="col-12">
                            <label className="form-label-custom">Phone Number</label>
                            <div className="input-group-custom">
                                <Phone size={20} className="input-icon-absolute" />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="form-control-custom"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                        </div>

                        {/* Skills & Experience (Conditional maybe? keeping for both for now based on original) */}
                        <div className="col-md-6">
                            <label className="form-label-custom">Primary Skills</label>
                            <div className="input-group-custom">
                                <Wrench size={20} className="input-icon-absolute" />
                                <input
                                    type="text"
                                    name="skills"
                                    value={formData.skills}
                                    onChange={handleChange}
                                    className="form-control-custom"
                                    placeholder="e.g. React, Java"
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label-custom">Experience</label>
                            <div className="input-group-custom">
                                <Briefcase size={20} className="input-icon-absolute" />
                                <input
                                    type="text"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    className="form-control-custom"
                                    placeholder="e.g. 5+ years"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="col-12">
                            <label className="form-label-custom">Password</label>
                            <div className="input-group-custom">
                                <Lock size={20} className="input-icon-absolute" />
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="form-control-custom"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-submit-custom"
                    >
                        {loading ? 'Creating Account...' : 'Register Account'}
                    </button>
                </form>

                <p className="text-center mt-4 text-secondary small">
                    Already have an account? <Link to="/login" className="text-primary fw-bold">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
