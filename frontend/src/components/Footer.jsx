import { Link } from 'react-router-dom';
import {
    Facebook,
    Twitter,
    Linkedin,
    Instagram
} from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
            <div
                className="container"
                style={{
                    padding: '4rem 0',
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr',
                    gap: '3rem',
                }}
            >
                {/* Brand / About */}
                <div>
                    <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                        Connecting the world's best talent with top-tier companies.
                        Your career journey starts here.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <a href="#" style={iconStyle}><Twitter size={20} /></a>
                        <a href="#" style={iconStyle}><Linkedin size={20} /></a>
                        <a href="#" style={iconStyle}><Facebook size={20} /></a>
                        <a href="#" style={iconStyle}><Instagram size={20} /></a>
                    </div>
                </div>

                {/* Candidates */}
                <FooterColumn title="For Candidates">
                    <Link to="/jobs">Browse Jobs</Link>
                    <Link to="/companies">Browse Companies</Link>
                    <Link to="/salary">Salary Estimator</Link>
                    <Link to="/resume">Resume Builder</Link>
                </FooterColumn>

                {/* Employers */}
                <FooterColumn title="For Employers">
                    <Link to="/post-job">Post a Job</Link>
                    <Link to="/talent">Search Talent</Link>
                    <Link to="/pricing">Pricing Plans</Link>
                </FooterColumn>

                {/* Company */}
                <FooterColumn title="Company">
                    <Link to="/about">About Us</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/privacy">Privacy Policy</Link>
                    <Link to="/terms">Terms of Service</Link>
                </FooterColumn>
            </div>

            {/* Bottom Bar */}
            <div
                style={{
                    borderTop: '1px solid #e2e8f0',
                    padding: '1.5rem 0',
                    textAlign: 'center',
                    color: '#94a3b8',
                    fontSize: '0.875rem',
                }}
            >
                &copy; {new Date().getFullYear()} CareerLink Inc. All rights reserved.
            </div>
        </footer>
    );
};

/* Reusable column */
const FooterColumn = ({ title, children }) => (
    <div>
        <h3 style={{ fontWeight: 600, marginBottom: '1.25rem', color: '#0f172a' }}>
            {title}
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {children.map((child, i) => (
                <li key={i} style={{ color: '#475569' }}>
                    {child}
                </li>
            ))}
        </ul>
    </div>
);

const iconStyle = {
    color: '#64748b',
    transition: 'color 0.2s',
};

export default Footer;
