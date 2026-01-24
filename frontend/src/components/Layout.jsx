import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from './Footer';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, Menu, X } from 'lucide-react';

// ✅ ONLY CHANGE: import new logo
import logo from '../assets/brand/logo/careerlink-logo-primary.png';

const Layout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinkStyle = {
        color: 'var(--text-main)',
        textDecoration: 'none',
        transition: 'color 0.2s',
        background: 'none',
        border: 'none',
        padding: 0,
        font: 'inherit',
        cursor: 'pointer'
    };

    const handleMouseEnter = (e) => e.target.style.color = 'var(--primary)';
    const handleMouseLeave = (e) => e.target.style.color = 'var(--text-main)';

    return (
        <>
            <style>{`
                @media (max-width: 768px) {
                    .mobile-menu-btn {
                        display: block !important;
                    }
                    
                    nav:not(.mobile-nav) {
                        display: none !important;
                    }
                    
                    .mobile-nav {
                        display: flex !important;
                    }
                }
                
                @media (min-width: 769px) {
                    .mobile-menu-btn {
                        display: none !important;
                    }
                    
                    .mobile-nav {
                        display: none !important;
                    }
                }
            `}</style>
            <div className="app-layout">
            <header style={{
                backgroundColor: 'var(--surface)',
                borderBottom: '1px solid var(--border)',
                padding: '1rem',
                position: 'sticky',
                top: 0,
                zIndex: 50,
                color: 'var(--text-main)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <div
                    className="container"
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                    <Link
                        to="/"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            textDecoration: 'none'
                        }}
                    >
                        <img
                            src={logo}
                            alt="CareerLink"
                            style={{ height: '110px', width: 'auto' }}
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <Link
                            to="/"
                            style={navLinkStyle}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            Home
                        </Link>
                        <Link
                            to="/jobs"
                            style={navLinkStyle}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            Browse Jobs
                        </Link>

                        {user ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    style={navLinkStyle}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    style={navLinkStyle}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    style={navLinkStyle}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    style={navLinkStyle}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    Register
                                </Link>
                            </>
                        )}
                        
                        <ThemeToggle />
                    </nav>
                </div>
            </header>

            <main style={{ minHeight: 'calc(100vh - 73px)' }}>
                <Outlet />
            </main>

            <Footer />
        </div>
        </>
    );
};

export default Layout;