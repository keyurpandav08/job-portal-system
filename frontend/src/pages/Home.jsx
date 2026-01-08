import { Link } from 'react-router-dom';
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
import HeroImage from '../assets/hero-illustration.png';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            {/* Animated Background Elements */}
            <div className="bg-blob blob-1"></div>
            <div className="bg-blob blob-2"></div>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '4rem' }}>
                    <div className="hero-content">
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
                    <h2 className="section-title">Why Choose JobPortal?</h2>
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

            {/* About/CTA Section */}
            <section className="about-section">
                <div className="container">
                    <div className="cta-box">
                        <h2 className="cta-title">Ready to shape your future?</h2>
                        <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '2rem' }}>
                            Join thousands of professionals finding their dream jobs daily.
                        </p>
                        <Link to="/register" className="cta-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                            Create Free Account <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
