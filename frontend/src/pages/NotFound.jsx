import React from 'react';
import { Link } from 'react-router-dom';
import { FileSearch, Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
        {/* Animated Icon */}
        <div className="mb-4 d-flex justify-content-center">
            <div className="bg-light p-4 rounded-circle shadow-sm">
                <FileSearch size={64} className="text-primary" />
            </div>
        </div>

        {/* Text Content */}
        <h1 className="display-1 fw-bold text-dark">404</h1>
        <h2 className="h4 mb-3 text-secondary">Oops! Page not found</h2>
        <p className="text-muted mb-5 px-4" style={{ maxWidth: '450px' }}>
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable. Let's get you back on track!
        </p>

        {/* Action Buttons */}
        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <button 
                onClick={() => window.history.back()} 
                className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2"
            >
                <ArrowLeft size={18} /> Go Back
            </button>

            <Link to="/" className="btn btn-primary d-flex align-items-center justify-content-center gap-2">
                <Home size={18} /> Return Home
            </Link>
        </div>
    </div>
    </div>
);
};

export default NotFound;