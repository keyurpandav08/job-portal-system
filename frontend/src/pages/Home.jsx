import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Rocket,
    Briefcase,
    ShieldCheck,
    TrendingUp,
    ArrowRight,
    Search,
    CheckCircle,
    Building2
} from 'lucide-react';
import HeroImage from '../assets/image.png';
import './Home.css';

const Home = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchKeyword.trim()) {
            navigate(`/jobs?search=${encodeURIComponent(searchKeyword.trim())}`);
            setSearchKeyword('');
        }
    };

    return (
        <div className="home-container">
            {/* Animated Background Elements */}
            <div className="bg-blob blob-1"></div>
            <div className="bg-blob blob-2"></div>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '4rem' }}>
                    <div className="hero-content">
                        {/* Highlighted Search Bar - Before Badge */}
                        <form onSubmit={handleSearchSubmit} style={{ 
                            marginBottom: '2rem', 
                            animation: 'fadeInUp 0.8s ease-out 0.2s forwards',
                            opacity: 0
                        }}>
                            <div style={{
                                display: 'flex',
                                gap: '0.75rem',
                                backgroundColor: 'var(--surface)',
                                borderRadius: '1rem',
                                padding: '0.75rem',
                                border: '2px solid var(--primary)',
                                boxShadow: '0 0 30px rgba(6, 182, 212, 0.5), 0 10px 40px rgba(0, 0, 0, 0.3)',
                                backdropFilter: 'blur(10px)',
                                maxWidth: '100%',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)'
                            }}
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = 'var(--primary)';
                                e.currentTarget.style.boxShadow = '0 0 40px rgba(6, 182, 212, 0.7), 0 15px 50px rgba(0, 0, 0, 0.4)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = 'var(--primary)';
                                e.currentTarget.style.boxShadow = '0 0 30px rgba(6, 182, 212, 0.5), 0 10px 40px rgba(0, 0, 0, 0.3)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                            >
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Search size={22} style={{ color: 'var(--primary)', flexShrink: 0, fontWeight: 'bold' }} />
                                    <input
                                        type="text"
                                        value={searchKeyword}
                                        onChange={(e) => setSearchKeyword(e.target.value)}
                                        placeholder="Search jobs by title, company, or location..."
                                        style={{
                                            flex: 1,
                                            border: 'none',
                                            outline: 'none',
                                            backgroundColor: 'transparent',
                                            color: 'var(--text-main)',
                                            fontSize: '1rem',
                                            padding: '0.5rem 0',
                                            minWidth: 0,
                                            fontWeight: '500'
                                        }}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    style={{
                                        padding: '0.75rem 2rem',
                                        backgroundColor: 'var(--primary)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.75rem',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        whiteSpace: 'nowrap',
                                        boxShadow: '0 4px 15px rgba(6, 182, 212, 0.4)',
                                        fontSize: '1rem'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = 'var(--primary-hover)';
                                        e.target.style.transform = 'translateY(-2px)';
                                        e.target.style.boxShadow = '0 6px 20px rgba(6, 182, 212, 0.5)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = 'var(--primary)';
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = '0 4px 15px rgba(6, 182, 212, 0.4)';
                                    }}
                                >
                                    Search
                                </button>
                            </div>
                        </form>

                        <div className="hero-badge">
                            <Rocket size={18} className="text-primary" />
                            <span>#1 Job Portal 2026</span>
                        </div>

                        <h1 className="hero-title">
                            Unlock Your <br />
                            Next Career Move
                        </h1>

                        <p className="hero-subtitle">
                            Connect with top companies, get AI-powered resume insights, and track your applications in real-time. Your future starts here.
                        </p>

                        <div className="hero-buttons">
                            <Link to="/register" className="btn-primary-glow">
                                Get Started
                            </Link>
                            <Link to="/jobs" className="btn-outline">
                                Browse Jobs
                            </Link>
                        </div>

                        <div className="stats-container">
                            <div className="stat-item">
                                <span className="stat-number">10k+</span>
                                <span className="stat-label">Active Jobs</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">500+</span>
                                <span className="stat-label">Companies</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">95%</span>
                                <span className="stat-label">Hired</span>
                            </div>
                        </div>
                    </div>

                    <div className="hero-image-container">
                        <img src={HeroImage} alt="Future of Work Illustration" className="hero-image" />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <h2 className="section-title">Why Choose CareerLink?</h2>
                    <p className="section-subtitle">
                        We provide the tools you need to stand out and get hired faster than ever before.
                    </p>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <Search size={28} />
                            </div>
                            <h3 className="feature-title">AI Resume Scoring</h3>
                            <p className="feature-desc">
                                Get instant feedback on your resume with our advanced AI engine to increase your chances of being shortlisted.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <ShieldCheck size={28} />
                            </div>
                            <h3 className="feature-title">Verified Companies</h3>
                            <p className="feature-desc">
                                We vet every company on our platform to ensure safe and legitimate job opportunities for you.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <TrendingUp size={28} />
                            </div>
                            <h3 className="feature-title">Real-time Tracking</h3>
                            <p className="feature-desc">
                                Never lose track of your application status. Get real-time updates from application to offer letter.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About / CTA Section */}
            <section className="about-section">
                <div className="container">
                    <div className="cta-box">
                        <h2 className="cta-title">Ready to shape your future?</h2>

                        <p className="cta-subtitle">
                            Join thousands of professionals finding their dream jobs daily.
                        </p>

                        <Link to="/register" className="cta-btn">
                            Create Free Account
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
//