import { Link } from 'react-router-dom';
import {
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    Briefcase
} from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', padding: '4rem 0 2rem' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>

                    {/* Brand Column */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.25rem' }}>
                            <Briefcase size={24} />
                            <span>JobPortal</span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                            Connecting the world's best talent with top-tier companies. Your career journey starts here.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <a href="#" style={{ color: '#64748b', transition: 'color 0.2s' }}><Twitter size={20} /></a>
                            <a href="#" style={{ color: '#64748b', transition: 'color 0.2s' }}><Linkedin size={20} /></a>
                            <a href="#" style={{ color: '#64748b', transition: 'color 0.2s' }}><Facebook size={20} /></a>
                            <a href="#" style={{ color: '#64748b', transition: 'color 0.2s' }}><Instagram size={20} /></a>
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div>
                        <h3 style={{ fontWeight: '600', marginBottom: '1.5rem', color: '#0f172a' }}>For Candidates</h3>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li><Link to="/jobs" style={{ color: '#475569' }}>Browse Jobs</Link></li>
                            <li><Link to="/companies" style={{ color: '#475569' }}>Browse Companies</Link></li>
                            <li><Link to="/salary" style={{ color: '#475569' }}>Salary Estimator</Link></li>
                            <li><Link to="/resume" style={{ color: '#475569' }}>Resume Builder</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div>
                        <h3 style={{ fontWeight: '600', marginBottom: '1.5rem', color: '#0f172a' }}>For Employers</h3>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li><Link to="/post-job" style={{ color: '#475569' }}>Post a Job</Link></li>
                            <li><Link to="/talent" style={{ color: '#475569' }}>Search Talent</Link></li>
                            <li><Link to="/pricing" style={{ color: '#475569' }}>Pricing Plans</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 3 */}
                    <div>
                        <h3 style={{ fontWeight: '600', marginBottom: '1.5rem', color: '#0f172a' }}>Company</h3>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li><Link to="/about" style={{ color: '#475569' }}>About Us</Link></li>
                            <li><Link to="/contact" style={{ color: '#475569' }}>Contact</Link></li>
                            <li><Link to="/privacy" style={{ color: '#475569' }}>Privacy Policy</Link></li>
                            <li><Link to="/terms" style={{ color: '#475569' }}>Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '2rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.875rem' }}>
                    &copy; {new Date().getFullYear()} JobPortal Inc. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
