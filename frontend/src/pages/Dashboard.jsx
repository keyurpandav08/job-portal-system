import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import {
    Briefcase,
    User,
    Mail,
    Phone,
    Code,
    Award,
    Plus,
    LogOut,
    ExternalLink,
    Search
} from 'lucide-react';
import api from '../services/api';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [profile, setProfile] = useState(null);
    const [myJobs, setMyJobs] = useState([]);
    const [myApplications, setMyApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                if (!user?.username) return;

                const res = await api.get(`/users/username/${user.username}`);
                setProfile(res.data);

                if (res.data.roleName === 'EMPLOYER') {
                    const jobsRes = await api.get(`/job/user/${res.data.id}`);
                    setMyJobs(Array.isArray(jobsRes.data) ? jobsRes.data : []);
                } else {
                    const appsRes = await api.get(`/applications/user/${res.data.id}`);
                    setMyApplications(Array.isArray(appsRes.data) ? appsRes.data : []);
                }
            } catch (err) {
                console.error(err);
                toast.error("Failed to sync dashboard data.");
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchDashboardData();
    }, [user]);

    if (loading) return <Loader message="Preparing your workspace..." />;

    if (!profile) return (
        <div className="container py-5 text-center">
            <h2 className="fw-bold mb-3">Profile Inaccessible</h2>
            <button onClick={logout} className="btn btn-primary px-4">Relogin</button>
        </div>
    );

    const isEmployer = profile.roleName === 'EMPLOYER';

    return (
        <div className="container py-5">
            {/* Header Section */}
            <div className="d-flex flex-wrap justify-content-between align-items-end mb-5 gap-3">
                <div>
                    <h1 className="display-6 fw-bold text-slate-900 mb-1">
                        {isEmployer ? 'Employer Command Center' : 'Candidate Workspace'}
                    </h1>
                    <p className="text-muted mb-0">Manage your {isEmployer ? 'listings and hires' : 'applications and career'} here.</p>
                </div>
                <div className="d-flex gap-3">
                    {isEmployer && (
                        <Link to="/post-job" className="btn btn-primary d-flex align-items-center gap-2 px-4 shadow-sm">
                            <Plus size={18} /> Post New Job
                        </Link>
                    )}
                    <button onClick={logout} className="btn btn-outline-danger d-flex align-items-center gap-2 px-4">
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </div>

            <div className="row g-4">
                {/* Left: Profile Summary Card */}
                <div className="col-lg-4">
                    <div className="bg-white p-4 rounded-4 border border-slate-200 shadow-sm h-100">
                        <div className="d-flex align-items-center gap-3 mb-4">
                            <div className="bg-primary-soft p-3 rounded-circle text-primary">
                                <User size={32} />
                            </div>
                            <div>
                                <h5 className="fw-bold mb-0">{profile.fullName}</h5>
                                <span className="badge bg-light text-primary border border-primary-soft">{profile.roleName}</span>
                            </div>
                        </div>

                        <div className="d-grid gap-3 pt-3 border-top border-slate-100">
                            <div className="d-flex align-items-center gap-3">
                                <Mail size={16} className="text-muted" />
                                <span className="small text-slate-600">{profile.email}</span>
                            </div>
                            <div className="d-flex align-items-center gap-3">
                                <Phone size={16} className="text-muted" />
                                <span className="small text-slate-600">{profile.phone || 'No phone provided'}</span>
                            </div>
                            {!isEmployer && (
                                <>
                                    <div className="d-flex align-items-start gap-3">
                                        <Code size={16} className="text-muted mt-1" />
                                        <span className="small text-slate-600"><strong>Skills:</strong> {profile.skills || 'Add skills...'}</span>
                                    </div>
                                    <div className="d-flex align-items-start gap-3">
                                        <Award size={16} className="text-muted mt-1" />
                                        <span className="small text-slate-600"><strong>Experience:</strong> {profile.experience || 'Add experience...'}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right: Lists & Data */}
                <div className="col-lg-8">
                    <div className="bg-white rounded-4 border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-bottom border-slate-100 bg-light-soft">
                            <h5 className="fw-bold mb-0">
                                {isEmployer ? 'My Posted Positions' : 'Application History'}
                            </h5>
                        </div>

                        <div className="table-responsive">
                            <table className="table mb-0 align-middle">
                                <thead className="bg-light text-secondary">
                                    <tr>
                                        <th className="px-4 py-3 border-0 small text-uppercase fw-bold">Title / Status</th>
                                        <th className="py-3 border-0 small text-uppercase fw-bold">{isEmployer ? 'Location' : 'Company'}</th>
                                        <th className="py-3 border-0 small text-uppercase fw-bold text-end px-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isEmployer ? (
                                        myJobs.length > 0 ? myJobs.map(job => (
                                            <tr key={job.id}>
                                                <td className="px-4 py-3">
                                                    <div className="fw-bold text-slate-900">{job.title}</div>
                                                    <span className="badge bg-success-soft text-success x-small mt-1">● {job.status}</span>
                                                </td>
                                                <td className="py-3 text-muted">{job.location}</td>
                                                <td className="px-4 py-3 text-end">
                                                    <Link to={`/jobs/${job.id}`} className="btn btn-light btn-sm rounded-3">
                                                        <ExternalLink size={14} />
                                                    </Link>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan="3" className="text-center py-5 text-muted">No jobs posted yet.</td></tr>
                                        )
                                    ) : (
                                        myApplications.length > 0 ? myApplications.map(app => (
                                            <tr key={app.id}>
                                                <td className="px-4 py-3">
                                                    <div className="fw-bold text-slate-900">{app.jobTitle || 'Job Listing'}</div>
                                                    <span className={`small fw-medium ${app.status === 'PENDING' ? 'text-warning' : 'text-success'}`}>
                                                        {app.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 text-muted">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <Briefcase size={14} /> Applied on {new Date(app.appliedAt).toLocaleDateString()}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-end">
                                                    <Link to={`/jobs/${app.jobId}`} className="btn btn-light btn-sm rounded-3 text-primary fw-bold">
                                                        View
                                                    </Link>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="3" className="text-center py-5">
                                                    <Search className="text-muted mb-2" size={32} />
                                                    <p className="text-muted small">No applications found. Time to apply!</p>
                                                    <Link to="/jobs" className="btn btn-primary btn-sm">Browse Jobs</Link>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;