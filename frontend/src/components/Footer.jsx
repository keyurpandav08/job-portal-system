import React from 'react';
import { Link } from 'react-router-dom';
import {
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    Briefcase,
    Mail,
    MapPin
} from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-professional mt-auto">
            <div className="container py-5">
                <div className="row g-4">
                    {/* Brand Section */}
                    <div className="col-12 col-lg-4 mb-4 mb-lg-0">
                        <div className="d-flex align-items-center gap-2 fw-bold text-primary mb-3">
                            <div className="bg-primary text-white p-1 rounded-2">
                                <Briefcase size={20} />
                            </div>
                            <span className="h5 mb-0 text-slate-900">JobPortal</span>
                        </div>
                        <p className="text-slate-600 mb-4 pe-lg-5">
                            Connecting the world's best talent with top-tier companies. 
                            Your career journey starts here.
                        </p>
                        <div className="d-flex gap-3">
                            <a href="#" className="social-icon"><Twitter size={20} /></a>
                            <a href="#" className="social-icon"><Linkedin size={20} /></a>
                            <a href="#" className="social-icon"><Facebook size={20} /></a>
                            <a href="#" className="social-icon"><Instagram size={20} /></a>
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className="col-6 col-md-4 col-lg-2">
                        <FooterColumn title="For Candidates">
                            <Link to="/jobs">Browse Jobs</Link>
                            <Link to="/jobs">Browse Companies</Link>
                            <Link to="/dashboard">Salary Estimator</Link>
                        </FooterColumn>
                    </div>

                    <div className="col-6 col-md-4 col-lg-3">
                        <FooterColumn title="For Employers">
                            <Link to="/post-job">Post a Job</Link>
                            <Link to="/dashboard">Search Talent</Link>
                            <Link to="/register">Pricing Plans</Link>
                        </FooterColumn>
                    </div>

                    <div className="col-12 col-md-4 col-lg-3">
                        <FooterColumn title="Contact Us">
                            <div className="d-flex align-items-center gap-2 text-slate-600 small mb-2">
                                <Mail size={16} /> support@jobportal.com
                            </div>
                            <div className="d-flex align-items-center gap-2 text-slate-600 small">
                                <MapPin size={16} /> Global Tech Plaza, NY
                            </div>
                        </FooterColumn>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-top py-4 bg-light">
                <div className="container d-flex flex-wrap justify-content-between align-items-center gap-2">
                    <p className="text-slate-500 small mb-0">
                        &copy; {currentYear} JobPortal System. All rights reserved.
                    </p>
                    <div className="d-flex gap-4 small text-slate-500">
                        <Link to="/privacy" className="footer-link">Privacy</Link>
                        <Link to="/terms" className="footer-link">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const FooterColumn = ({ title, children }) => (
    <div>
        <h6 className="fw-bold text-slate-900 mb-3 text-uppercase small" style={{ letterSpacing: '1px' }}>
            {title}
        </h6>
        <div className="d-flex flex-column gap-2">
            {React.Children.map(children, (child) => (
                <div className="footer-link-wrapper">{child}</div>
            ))}
        </div>
    </div>
);

export default Footer;