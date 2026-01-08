import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, DollarSign, Clock } from 'lucide-react';
import api from '../services/api';

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await api.get('/job');
                setJobs(response.data);
            } catch (err) {
                console.error(err);
                setError('Failed to load jobs. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (loading) {
        return <div className="text-center" style={{ padding: '4rem' }}>Loading jobs...</div>;
    }

    if (error) {
        return <div className="text-center" style={{ padding: '4rem', color: 'red' }}>{error}</div>;
    }

    return (
        <div className="container" style={{ padding: '4rem 1rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '2rem', color: '#1e293b' }}>
                Latest Job Openings
            </h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {jobs.map((job) => (
                    <div key={job.id} style={{
                        backgroundColor: 'white',
                        borderRadius: '1rem',
                        padding: '1.5rem',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                        transition: 'transform 0.2s',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>{job.title}</h3>
                                <div style={{
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '9999px',
                                    backgroundColor: job.status === 'Open' ? '#dcfce7' : '#f1f5f9',
                                    color: job.status === 'Open' ? '#166534' : '#64748b',
                                    fontSize: '0.75rem',
                                    fontWeight: '600'
                                }}>
                                    {job.status}
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.9rem' }}>
                                <Briefcase size={16} />
                                <span>{job.employerName || 'Confidential'}</span>
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            marginBottom: '1.5rem',
                            color: '#475569',
                            fontSize: '0.875rem'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <MapPin size={16} />
                                <span>{job.location}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <DollarSign size={16} />
                                <span>${job.salary}</span>
                            </div>
                        </div>

                        <div style={{ marginTop: 'auto' }}>
                            <Link to={`/jobs/${job.id}`} className="btn-primary-glow" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {jobs.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
                    No jobs found at the moment.
                </div>
            )}
        </div>
    );
};

export default JobList;
