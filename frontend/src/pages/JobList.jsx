import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, DollarSign, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import Loader from '../components/Loader';

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await api.get('/job');
                setJobs(Array.isArray(response.data) ? response.data : []);
            } catch (err) {
                console.error(err);
                toast.error('Failed to load jobs. Please check your connection.');
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (loading) {
        return <Loader message="Scouting for opportunities..." />;
    }

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                    <h1 className="display-5 fw-bold text-slate-900">Latest Openings</h1>
                    <p className="text-muted">Discover your next career move</p>
                </div>
                {/* Visual Polish: Added a simple badge showing count */}
                <span className="badge bg-primary-soft text-primary px-3 py-2 rounded-pill">
                    {jobs.length} Jobs Available
                </span>
            </div>

            {jobs.length > 0 ? (
                <div className="row g-4">
                    {jobs.map((job) => (
                        <div key={job.id} className="col-12 col-md-6 col-lg-4">
                            <div className="job-card-professional">
                                <div className="d-flex justify-content-between mb-3">
                                    <h3 className="h5 fw-bold mb-0 text-truncate" style={{maxWidth: '70%'}}>
                                        {job.title}
                                    </h3>
                                    <span className={`status-badge ${job.status?.toLowerCase()}`}>
                                        {job.status}
                                    </span>
                                </div>
                                
                                <div className="d-flex align-items-center gap-2 text-muted small mb-3">
                                    <Briefcase size={14} />
                                    <span>{job.employerName || 'Confidential'}</span>
                                </div>

                                <div className="job-details-grid mb-4">
                                    <div className="detail-item">
                                        <MapPin size={14} />
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="detail-item">
                                        <DollarSign size={14} />
                                        <span>${job.salary}</span>
                                    </div>
                                </div>

                                <Link to={`/jobs/${job.id}`} className="btn btn-primary w-100 py-2 fw-semibold">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-5">
                    <Search size={48} className="text-muted mb-3" />
                    <h3 className="h5 text-secondary">No jobs found at the moment.</h3>
                    <p className="text-muted">Check back later or try adjusting your filters.</p>
                </div>
            )}
        </div>
    );
};

export default JobList;