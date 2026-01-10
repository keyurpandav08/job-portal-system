import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Briefcase,
    MapPin,
    DollarSign,
    AlignLeft,
    Send,
    PlusCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const CreateJob = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        salary: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user || !user.id) {
            toast.error("You must be logged in to post a job.");
            return;
        }

        setLoading(true);

        try {
            const payload = {
                ...formData,
                employer: { id: user.id }
            };
            
            // Using toast.promise for a high-end feel
            await toast.promise(
                api.post('/job', payload),
                {
                    loading: 'Publishing your job listing...',
                    success: 'Job posted successfully! Redirecting...',
                    error: 'Failed to post job. Please check your inputs.',
                }
            );

            navigate('/dashboard');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-xl-7">
                    {/* Form Header */}
                    <div className="text-center mb-5">
                        <div className="bg-primary-soft text-primary d-inline-flex p-3 rounded-circle mb-3">
                            <PlusCircle size={32} />
                        </div>
                        <h1 className="display-6 fw-bold text-slate-900">Post a New Job</h1>
                        <p className="text-muted">Reach thousands of candidates by providing clear job details.</p>
                    </div>

                    {/* Main Form Card */}
                    <form onSubmit={handleSubmit} className="bg-white p-4 p-md-5 rounded-4 border border-slate-200 shadow-md">
                        <div className="row g-4">
                            {/* Job Title */}
                            <div className="col-12">
                                <label className="form-label fw-bold text-slate-700">Job Title</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-slate-200">
                                        <Briefcase size={18} className="text-muted" />
                                    </span>
                                    <input
                                        type="text"
                                        name="title"
                                        className="form-control border-slate-200 py-2"
                                        placeholder="e.g. Senior React Developer"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Location */}
                            <div className="col-md-6">
                                <label className="form-label fw-bold text-slate-700">Location</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-slate-200">
                                        <MapPin size={18} className="text-muted" />
                                    </span>
                                    <input
                                        type="text"
                                        name="location"
                                        className="form-control border-slate-200 py-2"
                                        placeholder="e.g. Remote, NY"
                                        value={formData.location}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Salary */}
                            <div className="col-md-6">
                                <label className="form-label fw-bold text-slate-700">Salary ($)</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-slate-200">
                                        <DollarSign size={18} className="text-muted" />
                                    </span>
                                    <input
                                        type="number"
                                        name="salary"
                                        className="form-control border-slate-200 py-2"
                                        placeholder="e.g. 120000"
                                        value={formData.salary}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="col-12">
                                <label className="form-label fw-bold text-slate-700">Job Description</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-slate-200 align-items-start pt-2">
                                        <AlignLeft size={18} className="text-muted" />
                                    </span>
                                    <textarea
                                        name="description"
                                        className="form-control border-slate-200 py-2"
                                        rows="6"
                                        placeholder="Describe requirements, responsibilities, etc."
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                        style={{ fontFamily: 'inherit' }}
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="col-12 mt-5">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                                >
                                    {loading ? (
                                        'Processing...'
                                    ) : (
                                        <>
                                            <Send size={18} /> Post Job Listing
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateJob;