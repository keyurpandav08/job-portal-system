import React from 'react';
import { Link } from 'react-router-dom';
import { FileSearch, Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
        {/* Animated Icon */}
        <div className="mb-4 d-flex justify-content-center">
            <div style={{
                backgroundColor: 'var(--surface)',
                padding: '1.5rem',
                borderRadius: '50%',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--border)'
            }}>
                <FileSearch size={64} style={{ color: 'var(--primary)' }} />
            </div>
        </div>

        {/* Text Content */}
        <h1 style={{ fontSize: '3.5rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '1rem' }}>404</h1>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>Oops! Page not found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', paddingLeft: '1rem', paddingRight: '1rem', maxWidth: '450px', margin: '0 auto 2rem' }}>
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable. Let's get you back on track!
        </p>

        {/* Action Buttons */}
        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <button 
                onClick={() => window.history.back()} 
                style={{
                    backgroundColor: 'var(--surface)',
                    color: 'var(--text-main)',
                    border: '1px solid var(--border)',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: '600',
                    transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                    e.target.style.borderColor = 'var(--primary)';
                    e.target.style.color = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.borderColor = 'var(--border)';
                    e.target.style.color = 'var(--text-main)';
                }}
            >
                <ArrowLeft size={18} /> Go Back
            </button>

            <Link to="/" style={{
                backgroundColor: 'var(--primary)',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--primary-hover)';
                e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--primary)';
                e.target.style.transform = 'translateY(0)';
            }}>
                <Home size={18} /> Return Home
            </Link>
        </div>
    </div>
    </div>
);
};

export default NotFound;