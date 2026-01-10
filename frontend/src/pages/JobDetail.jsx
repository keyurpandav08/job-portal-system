import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, DollarSign, Briefcase, Calendar, ArrowLeft, Send, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import Loader from '../components/Loader';

const JobDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);

    // Get user from localStorage
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await api.get(`/job/${id}`);
                setJob(response.data);
            } catch (err) {
                console.error(err);
                toast.error('Failed to load job details.');
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    const handleApply = async () => {
        if (!user) {
            toast.error("Please login to apply for this position.");
            navigate('/login');
            return;
        }
        
        if (user.roleName === 'EMPLOYER') {
            toast.error("Employers are not eligible to apply for jobs.");
            return;
        }

        // Professional Toast Promise (Shows loading state while API runs)
        const applyPromise = api.post('/applications/apply', {
            userId: user.id,
            jobId: job.id
        });

        setApplying(true);
        toast.promise(applyPromise, {
            loading: 'Submitting your application...',
            success: 'Application sent successfully! Good luck.',
            error: (err) => err.response?.data?.error || "Failed to submit application."
        });

        try {
            await applyPromise;
        } catch (err) {
            console.error(err);
        } finally {
            setApplying(false);
        }
    };

    if (loading) return <Loader message="Opening the job vault..." />;
    if (!job) return (
        <div className="container py-5 text-center">
            <AlertCircle size={48} className="text-muted mb-3" />
            <h3>Job Not Found</h3>
            <Link to="/jobs" className="btn btn-primary mt-3">Back to Jobs</Link>
        </div>
    );

    return (
        <div className="container py-4 py-lg-5">
            {/* Back Button */}
            <Link to="/jobs" className="btn btn-link text-decoration-none text-secondary d-inline-flex align-items-center gap-2 mb-4 p-0 hover-translate-left">
                <ArrowLeft size={18} />
                <span className="fw-medium">Explore all opportunities</span>
            </Link>

            <div className="row g-4">
                {/* Left Column: Job Content */}
                <div className="col-lg-8">
                    <div className="bg-white border border-slate-200 rounded-4 p-4 p-md-5 shadow-sm">
                        <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
                            <div>
                                <h1 className="display-6 fw-bold text-slate-900 mb-2">{job.title}</h1>
                                <div className="d-flex align-items-center gap-2 text-primary fw-semibold h5 mb-0">
                                    <Briefcase size={20} />
                                    {job.employerName}
                                </div>
                            </div>
                            <span className={`badge rounded-pill px-3 py-2 ${job.status === 'Open' ? 'bg-success-soft text-success' : 'bg-light text-muted'}`}>
                                ● {job.status}
                            </span>
                        </div>

                        <hr className="my-4 border-slate-100" />

                        <div className="job-content">
                            <h4 className="fw-bold text-slate-900 mb-3">Description</h4>
                            <p className="text-slate-600 leading-relaxed mb-4" style={{ whiteSpace: 'pre-line' }}>
                                {job.description || "The employer has not provided a detailed description."}
                            </p>
                            
                            <h4 className="fw-bold text-slate-900 mb-3 mt-5">Requirements</h4>
                            <ul className="text-slate-600 leading-relaxed">
                                <li>Minimum 2 years of relevant professional experience.</li>
                                <li>Proficiency in core tools and industry best practices.</li>
                                <li>Strong collaborative and communication skills.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Right Column: Sidebar */}
                <div className="col-lg-4">
                    <div className="sticky-top" style={{ top: '2rem' }}>
                        <div className="bg-white border border-slate-200 rounded-4 p-4 shadow-sm">
                            <h5 className="fw-bold text-slate-900 mb-4">Job Summary</h5>
                            
                            <div className="d-grid gap-4">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="bg-light p-2 rounded-3 text-primary"><MapPin size={20} /></div>
                                    <div>
                                        <small className="text-muted d-block">Location</small>
                                        <span className="fw-semibold text-slate-800">{job.location}</span>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center gap-3">
                                    <div className="bg-light p-2 rounded-3 text-success"><DollarSign size={20} /></div>
                                    <div>
                                        <small className="text-muted d-block">Annual Salary</small>
                                        <span className="fw-semibold text-slate-800">${job.salary.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center gap-3">
                                    <div className="bg-light p-2 rounded-3 text-warning"><Calendar size={20} /></div>
                                    <div>
                                        <small className="text-muted d-block">Status</small>
                                        <span className="fw-semibold text-slate-800">{job.status}</span>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={handleApply}
                                disabled={applying || job.status !== 'Open'}
                                className="btn btn-primary w-100 mt-5 py-3 fw-bold d-flex align-items-center justify-content-center gap-2 transition-all"
                            >
                                {applying ? 'Processing...' : (
                                    <>
                                        <Send size={18} /> Apply for this Job
                                    </>
                                )}
                            </button>
                            
                            {job.status !== 'Open' && (
                                <p className="text-center text-danger small mt-2">Applications for this job are currently closed.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetail;