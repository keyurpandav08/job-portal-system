import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const CreateJob = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        salary: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { user } = useAuth(); // Get user from context

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!user || !user.id) {
            setError("You must be logged in to post a job.");
            setLoading(false);
            return;
        }

        try {
            const payload = {
                ...formData,
                employer: { id: user.id }
            };
            await api.post('/job', payload);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError('Failed to post job. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ padding: '4rem 1rem', maxWidth: '800px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Post a New Job</h1>

            {error && (
                <div style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: 'var(--shadow-md)' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Job Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Senior React Developer"
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Remote, San Francisco"
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Salary ($)</label>
                    <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        required
                        placeholder="e.g. 120000"
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="6"
                        placeholder="Describe requirements, responsibilities, etc."
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontFamily: 'inherit' }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary-glow"
                    style={{ padding: '1rem', fontSize: '1.1rem', cursor: loading ? 'wait' : 'pointer' }}
                >
                    {loading ? 'Posting...' : 'Post Job'}
                </button>
            </form>
        </div>
    );
};

export default CreateJob;
