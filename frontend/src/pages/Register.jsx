import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    User, 
    UserPlus, 
    Mail, 
    Lock, 
    Phone, 
    Briefcase, 
    Wrench, 
    ShieldCheck 
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';

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
        role: { name: 'APPLICANT' }
    });
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

        try {
            let roleToSend = null;
            if (formData.role.name === 'APPLICANT') {
                roleToSend = null;
            } else {
                // Preserving your specific backend requirement: Employer ID = 2
                roleToSend = { id: 2, name: 'EMPLOYER' };
            }

            const payload = { ...formData, role: roleToSend };

            await api.post('/users/register', payload);
            toast.success("Account created successfully!");
            navigate('/login', { state: { message: 'Registration successful! Please login.' } });
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.message || "Registration failed. Please try again.";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-10 col-xl-8">
                    <div className="bg-white p-4 p-md-5 rounded-4 border border-slate-200 shadow-lg">
                        <div className="text-center mb-5">
                            <div className="bg-primary-soft text-primary d-inline-flex p-3 rounded-circle mb-3">
                                <UserPlus size={32} />
                            </div>
                            <h2 className="fw-bold text-slate-900">Create Your Account</h2>
                            <p className="text-muted">Join the professional network and unlock your potential.</p>
                        </div>

                        {/* Professional Role Toggler */}
                        <div className="d-flex gap-2 mb-5 p-1 bg-light rounded-3">
                            <button 
                                type="button"
                                onClick={() => handleChange({ target: { name: 'role', value: 'APPLICANT' } })}
                                className={`btn flex-grow-1 py-3 fw-bold transition-all d-flex align-items-center justify-content-center gap-2 ${formData.role.name === 'APPLICANT' ? 'btn-primary shadow' : 'border-0 text-muted'}`}
                            >
                                <User size={18} /> Candidate
                            </button>
                            <button 
                                type="button"
                                onClick={() => handleChange({ target: { name: 'role', value: 'EMPLOYER' } })}
                                className={`btn flex-grow-1 py-3 fw-bold transition-all d-flex align-items-center justify-content-center gap-2 ${formData.role.name === 'EMPLOYER' ? 'btn-primary shadow' : 'border-0 text-muted'}`}
                            >
                                <Briefcase size={18} /> Employer
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="row g-4">
                                {/* Row 1: Full Name & Username */}
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-slate-700">Full Name</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-slate-200"><UserCircle size={18} className="text-muted" /></span>
                                        <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className="form-control border-slate-200 py-2" placeholder="Jane Doe" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-slate-700">Username</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-slate-200"><ShieldCheck size={18} className="text-muted" /></span>
                                        <input type="text" name="username" required value={formData.username} onChange={handleChange} className="form-control border-slate-200 py-2" placeholder="jane.doe" />
                                    </div>
                                </div>

                                {/* Row 2: Email & Phone */}
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-slate-700">Email Address</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-slate-200"><Mail size={18} className="text-muted" /></span>
                                        <input type="email" name="email" required value={formData.email} onChange={handleChange} className="form-control border-slate-200 py-2" placeholder="jane@example.com" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-slate-700">Phone Number</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-slate-200"><Phone size={18} className="text-muted" /></span>
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-control border-slate-200 py-2" placeholder="+1 234 567 890" />
                                    </div>
                                </div>

                                {/* Row 3: Skills & Experience */}
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-slate-700">Top Skills</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-slate-200"><Wrench size={18} className="text-muted" /></span>
                                        <input type="text" name="skills" value={formData.skills} onChange={handleChange} className="form-control border-slate-200 py-2" placeholder="Java, React, SQL" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-slate-700">Years of Experience</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-slate-200"><Briefcase size={18} className="text-muted" /></span>
                                        <input type="text" name="experience" value={formData.experience} onChange={handleChange} className="form-control border-slate-200 py-2" placeholder="e.g. 3+ years" />
                                    </div>
                                </div>

                                {/* Row 4: Password */}
                                <div className="col-12">
                                    <label className="form-label fw-bold text-slate-700">Secure Password</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-slate-200"><Lock size={18} className="text-muted" /></span>
                                        <input type="password" name="password" required value={formData.password} onChange={handleChange} className="form-control border-slate-200 py-2" placeholder="Min. 8 characters" />
                                    </div>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="btn btn-primary w-100 py-3 fw-bold mt-5 shadow-sm d-flex align-items-center justify-content-center gap-2"
                            >
                                {loading ? 'Creating Your Profile...' : <><UserPlus size={20} /> Register Account</>}
                            </button>
                        </form>

                        <p className="text-center mt-4 text-muted small">
                            Already a member? <Link to="/login" className="text-primary fw-bold text-decoration-none">Sign in here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Simple helper for the icon used in inputs
const UserCircle = ({ size, className }) => (
    <User size={size} className={className} />
);

export default Register;