import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, DollarSign, Briefcase, Calendar, ArrowLeft } from 'lucide-react';
import api from '../services/api';

const JobDetail = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await api.get(`/job/${id}`);
                setJob(response.data);
            } catch (err) {
                console.error(err);
                setError('Failed to load job details.');
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [id]);

    const [applying, setApplying] = useState(false);

    // Check if user is logged in
    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : null;

    const handleApply = async () => {
        if (!user) {
            alert("Please login to apply.");
            return;
        }
        if (user.roleName === 'EMPLOYER') {
            alert("Employers cannot apply to jobs.");
            return;
        }

        if (!confirm(`Apply to ${job.title}?`)) return;

        setApplying(true);
        try {
            await api.post('/applications/apply', {
                userId: user.id,
                jobId: job.id
            });
            alert('Application Submitted Successfully!');
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.error || "Failed to apply.";
            alert(msg);
        } finally {
            setApplying(false);
        }
    };

    if (loading) return <div className="container" style={{ padding: '4rem' }}>Loading...</div>;
    if (error) return <div className="container" style={{ padding: '4rem', color: 'red' }}>{error}</div>;
    if (!job) return <div className="container" style={{ padding: '4rem' }}>Job not found</div>;

    return (
        <div className="container" style={{ padding: '4rem 1rem' }}>
            <Link to="/jobs" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                <ArrowLeft size={18} /> Back to Jobs
            </Link>

            <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '3rem', border: '1px solid #e2e8f0' }}>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '2rem', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1e293b', marginBottom: '1rem' }}>{job.title}</h1>
                    <div style={{ display: 'flex', gap: '2rem', color: '#475569' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Briefcase size={20} />
                            <span style={{ fontWeight: '500' }}>{job.employerName}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <MapPin size={20} />
                            <span>{job.location}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <DollarSign size={20} />
                            <span>${job.salary}</span>
                        </div>
                        {/* CreatedAt isn't in GET /job/{id} response schema, but implies it exists in main object. If missing, omit.*/}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ padding: '0.25rem 0.75rem', backgroundColor: '#eff6ff', color: '#2563eb', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '600' }}>
                                {job.status}
                            </span>
                        </div>
                    </div>
                </div>

                <div style={{ marginBottom: '3rem' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>Job Description</h3>
                    <p style={{ lineHeight: '1.8', color: '#334155' }}>
                        {job.description}
                    </p>
                </div>

                <button
                    onClick={handleApply}
                    disabled={applying}
                    className="btn-primary-glow"
                    style={{ fontSize: '1.1rem', padding: '1rem 3rem', cursor: applying ? 'wait' : 'pointer', opacity: applying ? 0.7 : 1 }}>
                    {applying ? 'Applying...' : 'Apply Now'}
                </button>
            </div>
        </div>
    );
};

export default JobDetail;
