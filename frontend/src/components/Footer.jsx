import { Link } from 'react-router-dom';
import {
    Facebook,
    Twitter,
    Linkedin,
    Instagram
} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer-professional mt-auto border-top bg-white">
            <div className="container py-5">
                <div className="row g-5">
                    {/* Column 1: Brand & Socials */}
                    <div className="col-12 col-lg-4">
                        <div className="d-flex align-items-center gap-2 fw-bold text-primary mb-4">
                            <div className="bg-primary text-white p-2 rounded-3 d-flex align-items-center justify-content-center">
                                <Briefcase size={22} />
                            </div>
                            <span className="h4 mb-0 text-slate-900 tracking-tight">JobPortal</span>
                        </div>
                        <p className="text-secondary mb-4 pe-lg-4 leading-relaxed">
                            Connecting the world's best talent with top-tier companies.
                            Your career journey starts here with trusted opportunities.
                        </p>
                        <div className="d-flex gap-3">
                            <SocialLink icon={<Twitter size={18} />} />
                            <SocialLink icon={<Linkedin size={18} />} />
                            <SocialLink icon={<Facebook size={18} />} />
                            <SocialLink icon={<Instagram size={18} />} />
                        </div>
                    </div>

                    {/* Column 2: Candidates */}
                    <div className="col-6 col-md-4 col-lg-2">
                        <h6 className="fw-bold text-slate-900 mb-4 text-uppercase small ls-1">Candidates</h6>
                        <div className="d-flex flex-column gap-3">
                            <FooterLink to="/jobs">Browse Jobs</FooterLink>
                            <FooterLink to="/jobs">Browse Companies</FooterLink>
                            <FooterLink to="/dashboard">Salary Estimator</FooterLink>
                            <FooterLink to="/dashboard">Career Advice</FooterLink>
                        </div>
                    </div>
                </div>

                    {/* Column 3: Employers */}
                    <div className="col-6 col-md-4 col-lg-3">
                        <h6 className="fw-bold text-slate-900 mb-4 text-uppercase small ls-1">Employers</h6>
                        <div className="d-flex flex-column gap-3">
                            <FooterLink to="/post-job" highlight>Post a Job</FooterLink>
                            <FooterLink to="/dashboard">Search Talent</FooterLink>
                            <FooterLink to="/register">Pricing Plans</FooterLink>
                            <FooterLink to="/register">Success Stories</FooterLink>
                        </div>
                    </div>

                    {/* Column 4: Contact */}
                    <div className="col-12 col-md-4 col-lg-3">
                        <h6 className="fw-bold text-slate-900 mb-4 text-uppercase small ls-1">Contact Us</h6>
                        <div className="d-flex flex-column gap-3">
                            <div className="d-flex align-items-start gap-3 text-secondary">
                                <Mail size={18} className="mt-1 text-primary" />
                                <span>support@jobportal.com<br /><small className="text-muted">Mon-Fri, 9am-6pm</small></span>
                            </div>
                            <div className="d-flex align-items-start gap-3 text-secondary">
                                <MapPin size={18} className="mt-1 text-primary" />
                                <span>Global Tech Plaza, Suite 500<br />New York, NY 10012</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-top py-4 bg-light-soft">
                <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                    <p className="text-secondary small mb-0">
                        &copy; {currentYear} JobPortal System. All rights reserved.
                    </p>
                    <div className="d-flex gap-4 small text-secondary">
                        <Link to="/privacy" className="footer-link-hover">Privacy Policy</Link>
                        <Link to="/terms" className="footer-link-hover">Terms of Service</Link>
                        <Link to="/cookies" className="footer-link-hover">Cookie Settings</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const FooterLink = ({ to, children, highlight }) => (
    <Link
        to={to}
        className={`text-decoration-none transition-smooth ${highlight ? 'text-primary fw-semibold' : 'text-slate-600 hover-text-primary'}`}
        style={{ fontSize: '0.95rem' }}
    >
        {children}
    </Link>
);

const SocialLink = ({ icon }) => (
    <a
        href="#"
        className="d-flex align-items-center justify-content-center rounded-circle border border-slate-200 text-slate-500 transition-all hover-bg-primary hover-text-white"
        style={{ width: '36px', height: '36px' }}
    >
        {icon}
    </a>
);

const iconStyle = {
    color: '#64748b',
    transition: 'color 0.2s',
};

export default Footer;
