import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [profile, setProfile] = useState(null);
    const [myJobs, setMyJobs] = useState([]);
    const [myApplications, setMyApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                if (!user?.username) return;

                // Fetch profile by username using the new endpoint
                const res = await api.get(`/users/username/${user.username}`);
                setProfile(res.data);

                // If Employer, fetch jobs
                if (res.data.roleName === 'EMPLOYER') {
                    const jobsRes = await api.get(`/job/user/${res.data.id}`);
                    // Ensure we always set an array
                    if (Array.isArray(jobsRes.data)) {
                        setMyJobs(jobsRes.data);
                    } else {
                        console.warn("Jobs response is not an array:", jobsRes.data);
                        setMyJobs([]);
                    }
                } else {
                    // If Applicant, fetch applications
                    try {
                        const appsRes = await api.get(`/applications/user/${res.data.id}`);
                        // Ensure we always set an array
                        if (Array.isArray(appsRes.data)) {
                            setMyApplications(appsRes.data);
                        } else {
                            console.warn("Applications response is not an array:", appsRes.data);
                            setMyApplications([]);
                        }
                    } catch (appErr) {
                        console.warn("Failed to fetch applications", appErr);
                        setMyApplications([]); // Ensure it's an empty array on error
                    }
                }
            } catch (err) {
                console.error(err);
                if (err.response && err.response.status === 404) {
                    setError("User profile not found.");
                } else {
                    setError('Failed to load dashboard data.');
                }
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchDashboardData();
        }
    }, [user]);

    if (loading) return <div className="container" style={{ padding: '4rem' }}>Loading Dashboard...</div>;

    if (!profile) return (
        <div className="container" style={{ padding: '4rem' }}>
            <h2>Dashboard</h2>
            <p>{error || "Could not load profile."}</p>
            <button onClick={logout} className="btn-primary-glow">Logout</button>
        </div>
    );

    const isEmployer = profile.roleName === 'EMPLOYER';

    return (
        <div className="container" style={{ padding: '4rem 1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                    {isEmployer ? 'Employer Dashboard' : 'Candidate Dashboard'}
                </h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {isEmployer && (
                        <Link to="/post-job" className="btn-primary-glow">
                            + Post New Job
                        </Link>
                    )}
                    <button onClick={logout} style={{ color: '#ef4444', fontWeight: 'bold' }}>Logout</button>
                </div>
            </div>

            {/* Profile Stats */}
            <div style={{
                backgroundColor: 'var(--surface)',
                padding: '2rem',
                borderRadius: '1rem',
                boxShadow: 'var(--shadow-md)',
                marginBottom: '3rem',
                border: '1px solid var(--border)'
            }}>
                <h3 style={{ borderBottom: '2px solid var(--primary)', paddingBottom: '0.5rem', marginBottom: '1.5rem', display: 'inline-block' }}>
                    My Profile
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                    <div>
                        <strong style={{ display: 'block', color: 'var(--primary)', fontSize: '0.875rem' }}>Full Name</strong>
                        <span style={{ fontSize: '1.1rem' }}>{profile.fullName}</span>
                    </div>
                    <div>
                        <strong style={{ display: 'block', color: 'var(--primary)', fontSize: '0.875rem' }}>Email</strong>
                        <span style={{ fontSize: '1.1rem' }}>{profile.email}</span>
                    </div>
                    <div>
                        <strong style={{ display: 'block', color: 'var(--primary)', fontSize: '0.875rem' }}>Phone</strong>
                        <span style={{ fontSize: '1.1rem' }}>{profile.phone || 'N/A'}</span>
                    </div>
                    {!isEmployer && (
                        <>
                            <div>
                                <strong style={{ display: 'block', color: 'var(--primary)', fontSize: '0.875rem' }}>Skills</strong>
                                <span style={{ fontSize: '1.1rem' }}>{profile.skills || 'N/A'}</span>
                            </div>
                            <div>
                                <strong style={{ display: 'block', color: 'var(--primary)', fontSize: '0.875rem' }}>Experience</strong>
                                <span style={{ fontSize: '1.1rem' }}>{profile.experience || 'N/A'}</span>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Role Specific Content */}
            {isEmployer ? (
                <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>My Posted Jobs</h3>
                    {!Array.isArray(myJobs) || myJobs.length === 0 ? (
                        <p>No jobs posted yet.</p>
                    ) : (
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            {myJobs.map(job => (
                                <div key={job.id} style={{ backgroundColor: 'var(--surface)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{job.title}</h4>
                                        <p style={{ color: 'var(--text-secondary)' }}>{job.location} • ${job.salary}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <span style={{ padding: '0.25rem 0.75rem', borderRadius: '999px', backgroundColor: 'var(--primary)', color: 'white', fontWeight: '600', opacity: 0.9 }}>
                                            {job.status}
                                        </span>
                                        {/* Placeholder for View Applications */}
                                        <button disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>View Applications (API N/A)</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>My Applications</h3>
                    {!Array.isArray(myApplications) || myApplications.length === 0 ? (
                        <div style={{ padding: '2rem', backgroundColor: 'var(--background)', borderRadius: '1rem', textAlign: 'center', border: '1px solid var(--border)' }}>
                            <p style={{ color: 'var(--text-secondary)' }}>You haven't applied to any jobs yet.</p>
                            <Link to="/jobs" className="btn-primary-glow" style={{ display: 'inline-block', marginTop: '1rem' }}>Browse Jobs</Link>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            {myApplications.map(app => (
                                <div key={app.id} style={{ backgroundColor: 'var(--surface)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{app.jobTitle || `Job #${app.jobId}`}</h4>
                                        <p style={{ color: 'var(--text-secondary)' }}>Status: <span style={{ fontWeight: 'bold', color: app.status === 'PENDING' ? 'var(--accent)' : 'var(--success)' }}>{app.status}</span></p>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Applied on: {new Date(app.appliedAt).toLocaleDateString()}</p>
                                    </div>
                                    <Link to={`/jobs/${app.jobId}`} className="btn-primary-glow" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>View Job</Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
