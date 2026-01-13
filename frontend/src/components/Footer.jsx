import { Link } from 'react-router-dom';
import {
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    Mail,
    MapPin,
    Briefcase
} from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer style={{
            backgroundColor: 'var(--surface)',
            borderTop: '1px solid var(--border)',
            marginTop: 'auto',
            color: 'var(--text-main)'
        }}>
            <div className="container py-5">
                <div className="row g-5">
                    {/* Column 1: Brand & Socials */}
                    <div className="col-12 col-lg-4">
                        <div className="d-flex align-items-center gap-2 fw-bold mb-4">
                            <div style={{
                                backgroundColor: 'var(--primary)',
                                color: 'white',
                                padding: '0.5rem',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Briefcase size={22} />
                            </div>
                            <span style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>JobPortal</span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.6' }}>
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
                        <h6 style={{
                            fontWeight: 'bold',
                            color: 'var(--text-main)',
                            marginBottom: '1.5rem',
                            textTransform: 'uppercase',
                            fontSize: '0.875rem',
                            letterSpacing: '0.05em'
                        }}>Candidates</h6>
                        <div className="d-flex flex-column gap-3">
                            <FooterLink to="/jobs">Browse Jobs</FooterLink>
                            <FooterLink to="/jobs">Browse Companies</FooterLink>
                            <FooterLink to="/dashboard">Salary Estimator</FooterLink>
                            <FooterLink to="/dashboard">Career Advice</FooterLink>
                        </div>
                    </div>

                    {/* Column 3: Employers */}
                    <div className="col-6 col-md-4 col-lg-3">
                        <h6 style={{
                            fontWeight: 'bold',
                            color: 'var(--text-main)',
                            marginBottom: '1.5rem',
                            textTransform: 'uppercase',
                            fontSize: '0.875rem',
                            letterSpacing: '0.05em'
                        }}>Employers</h6>
                        <div className="d-flex flex-column gap-3">
                            <FooterLink to="/post-job" highlight>Post a Job</FooterLink>
                            <FooterLink to="/dashboard">Search Talent</FooterLink>
                            <FooterLink to="/register">Pricing Plans</FooterLink>
                            <FooterLink to="/register">Success Stories</FooterLink>
                        </div>
                    </div>

                    {/* Column 4: Contact */}
                    <div className="col-12 col-md-4 col-lg-3">
                        <h6 style={{
                            fontWeight: 'bold',
                            color: 'var(--text-main)',
                            marginBottom: '1.5rem',
                            textTransform: 'uppercase',
                            fontSize: '0.875rem',
                            letterSpacing: '0.05em'
                        }}>Contact Us</h6>
                        <div className="d-flex flex-column gap-3">
                            <div className="d-flex align-items-start gap-3" style={{ color: 'var(--text-secondary)' }}>
                                <Mail size={18} style={{ marginTop: '0.25rem', color: 'var(--primary)' }} />
                                <span>support@jobportal.com<br /><small style={{ color: 'var(--text-secondary)' }}>Mon-Fri, 9am-6pm</small></span>
                            </div>
                            <div className="d-flex align-items-start gap-3" style={{ color: 'var(--text-secondary)' }}>
                                <MapPin size={18} style={{ marginTop: '0.25rem', color: 'var(--primary)' }} />
                                <span>Global Tech Plaza, Suite 500<br />New York, NY 10012</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div style={{
                borderTop: '1px solid var(--border)',
                padding: '1rem 0',
                backgroundColor: 'var(--background)'
            }}>
                <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: 0 }}>
                        &copy; {currentYear} JobPortal System. All rights reserved.
                    </p>
                    <div className="d-flex gap-4" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        <Link to="/privacy" style={{
                            textDecoration: 'none',
                            color: 'var(--text-secondary)',
                            transition: 'color 0.2s'
                        }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Privacy Policy</Link>
                        <Link to="/terms" style={{
                            textDecoration: 'none',
                            color: 'var(--text-secondary)',
                            transition: 'color 0.2s'
                        }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Terms of Service</Link>
                        <Link to="/cookies" style={{
                            textDecoration: 'none',
                            color: 'var(--text-secondary)',
                            transition: 'color 0.2s'
                        }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Cookie Settings</Link>
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
