import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = ({ message = "Loading..." }) => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '300px' }}>
        <Spinner
            animation="border"
            role="status"
            variant="primary"
            style={{ width: '3rem', height: '3rem' }}
        >
            <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3 text-secondary fw-medium">{message}</p>
        </div>
    );
    };

export default Loader;