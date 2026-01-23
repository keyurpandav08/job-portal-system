import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Briefcase, MapPin, DollarSign, Clock, Search } from 'lucide-react';
import api from '../services/api';

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    //search jobs
    const [searchKeyword, setSearchKeyword] = useState(searchParams.get('search') || '');

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            setError('');
            try {
                const searchTerm = searchParams.get('search');
                const url = searchTerm ? `/job?search=${encodeURIComponent(searchTerm)}` : '/job';
                const response = await api.get(url);
                setJobs(Array.isArray(response.data) ? response.data : []);
            } catch (err) {
                console.error(err);
                setError('Failed to load jobs. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [searchParams]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchKeyword.trim()) {
            setSearchParams({ search: searchKeyword.trim() });
        } else {
            setSearchParams({});
        }
    };

    if (loading) {
        return <div className="text-center" style={{ padding: '4rem' }}>Loading jobs...</div>;
    }

    if (error) {
        return <div className="text-center" style={{ padding: '4rem', color: 'var(--danger)' }}>{error}</div>;
    }

    return (
        <div className="container" style={{ padding: '4rem 1rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '2rem', color: 'var(--text-main)' }}>
                {searchParams.get('search') ? `Search Results for "${searchParams.get('search')}"` : 'Latest Job Openings'}
            </h1>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} style={{ marginBottom: '2rem' }}>
                <div style={{
                    display: 'flex',
                    gap: '0.75rem',
                    flexWrap: 'wrap',
                    alignItems: 'center'
                }}>
                    <div style={{
                        flex: '1 1 300px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        backgroundColor: 'var(--surface)',
                        borderRadius: '0.75rem',
                        padding: '0.75rem 1rem',
                        border: '1px solid var(--border)'
                    }}>
                        <Search size={20} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />
                        <input
                            type="text"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            placeholder="Search jobs by title, description, company, or location..."
                            style={{
                                flex: 1,
                                border: 'none',
                                outline: 'none',
                                backgroundColor: 'transparent',
                                color: 'var(--text-main)',
                                fontSize: '1rem',
                                minWidth: 0
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn-primary-glow"
                        style={{
                            padding: '0.75rem 1.5rem',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        Search
                    </button>
                    {searchParams.get('search') && (
                        <button
                            type="button"
                            onClick={() => {
                                setSearchKeyword('');
                                setSearchParams({});
                            }}
                            style={{
                                padding: '0.75rem 1.5rem',
                                backgroundColor: 'var(--surface)',
                                color: 'var(--text-main)',
                                border: '1px solid var(--border)',
                                borderRadius: '0.75rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            Clear
                        </button>
                    )}
                </div>
            </form>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {jobs.map((job) => (
                    <div key={job.id} style={{
                        backgroundColor: 'var(--surface)',
                        borderRadius: '1rem',
                        padding: '1.5rem',
                        border: '1px solid var(--border)',
                        boxShadow: 'var(--shadow-md)',
                        transition: 'transform 0.2s',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.5rem' }}>{job.title}</h3>
                                <div style={{
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '9999px',
                                    backgroundColor: job.status === 'Open' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(107, 114, 128, 0.15)',
                                    color: job.status === 'Open' ? 'var(--success)' : 'var(--text-secondary)',
                                    fontSize: '0.75rem',
                                    fontWeight: '600'
                                }}>
                                    {job.status}
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                <Briefcase size={16} />
                                <span>{job.employerName || 'Confidential'}</span>
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            marginBottom: '1.5rem',
                            color: 'var(--text-secondary)',
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

            {jobs.length === 0 && !loading && (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                    {searchParams.get('search') 
                        ? `No jobs found matching "${searchParams.get('search')}". Try a different search term.`
                        : 'No jobs found at the moment.'}
                </div>
            )}
        </div>
    );
};

export default JobList;
