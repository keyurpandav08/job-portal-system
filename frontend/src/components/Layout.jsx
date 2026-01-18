import { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, Menu, X } from 'lucide-react';

// ✅ ONLY CHANGE: import new logo
import logo from '../assets/brand/logo/careerlink-logo-primary.png';

const Layout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const userMenuRef = useRef(null);

    const isAuthenticated = !!user;

    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
        };

        if (showUserMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showUserMenu]);

    const handleLogout = async () => {
        await logout();
        navigate('/');
        setShowUserMenu(false);
        setShowMobileMenu(false);
    };

    const navLinkStyle = {
        color: 'var(--text-main)',
        textDecoration: 'none',
        transition: 'color 0.2s',
        padding: '0.5rem 0.75rem',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    };

    const navLinkHover = {
        color: 'var(--primary)',
        backgroundColor: 'var(--surface-hover)'
    };

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
                    <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <Link
                            to="/"
                            style={navLinkStyle}
                            onMouseEnter={(e) => {
                                e.target.style.color = navLinkHover.color;
                                e.target.style.backgroundColor = navLinkHover.backgroundColor;
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = navLinkStyle.color;
                                e.target.style.backgroundColor = 'transparent';
                            }}
                        >
                            Home
                        </Link>
                        <Link
                            to="/jobs"
                            style={navLinkStyle}
                            onMouseEnter={(e) => {
                                e.target.style.color = navLinkHover.color;
                                e.target.style.backgroundColor = navLinkHover.backgroundColor;
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = navLinkStyle.color;
                                e.target.style.backgroundColor = 'transparent';
                            }}
                        >
                            Browse Jobs
                        </Link>

                        {/* Conditional Navigation Based on Auth State */}
                        {!isAuthenticated ? (
                            <>
                                <Link
                                    to="/login"
                                    style={navLinkStyle}
                                    onMouseEnter={(e) => {
                                        e.target.style.color = navLinkHover.color;
                                        e.target.style.backgroundColor = navLinkHover.backgroundColor;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.color = navLinkStyle.color;
                                        e.target.style.backgroundColor = 'transparent';
                                    }}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    style={{
                                        ...navLinkStyle,
                                        backgroundColor: 'var(--primary)',
                                        color: 'white',
                                        fontWeight: '600'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = 'var(--primary-hover)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = 'var(--primary)';
                                    }}
                                >
                                    Register
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/dashboard"
                                    style={navLinkStyle}
                                    onMouseEnter={(e) => {
                                        e.target.style.color = navLinkHover.color;
                                        e.target.style.backgroundColor = navLinkHover.backgroundColor;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.color = navLinkStyle.color;
                                        e.target.style.backgroundColor = 'transparent';
                                    }}
                                >
                                    Dashboard
                                </Link>
                                
                                {/* User Menu Dropdown */}
                                <div ref={userMenuRef} style={{ position: 'relative' }}>
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        style={{
                                            ...navLinkStyle,
                                            border: 'none',
                                            background: 'transparent',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.color = navLinkHover.color;
                                            e.target.style.backgroundColor = navLinkHover.backgroundColor;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.color = navLinkStyle.color;
                                            e.target.style.backgroundColor = 'transparent';
                                        }}
                                    >
                                        <User size={18} />
                                        <span>{user?.username || user?.fullName || 'User'}</span>
                                    </button>

                                    {showUserMenu && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '100%',
                                                right: 0,
                                                marginTop: '0.5rem',
                                                backgroundColor: 'var(--surface)',
                                                border: '1px solid var(--border)',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                                minWidth: '200px',
                                                padding: '0.5rem',
                                                zIndex: 1000
                                            }}
                                            onMouseLeave={() => setShowUserMenu(false)}
                                        >
                                            <div style={{
                                                padding: '0.75rem',
                                                borderBottom: '1px solid var(--border)',
                                                marginBottom: '0.5rem'
                                            }}>
                                                <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>
                                                    {user?.fullName || user?.username}
                                                </div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                                                    {user?.email}
                                                </div>
                                                {user?.roleName && (
                                                    <div style={{
                                                        fontSize: '0.75rem',
                                                        color: 'var(--primary)',
                                                        marginTop: '0.5rem',
                                                        padding: '0.25rem 0.5rem',
                                                        backgroundColor: 'var(--primary-light)',
                                                        borderRadius: '4px',
                                                        display: 'inline-block'
                                                    }}>
                                                        {user.roleName}
                                                    </div>
                                                )}
                                            </div>
                                            <button
                                                onClick={handleLogout}
                                                style={{
                                                    width: '100%',
                                                    padding: '0.75rem',
                                                    border: 'none',
                                                    background: 'transparent',
                                                    color: 'var(--danger)',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    borderRadius: '6px',
                                                    textAlign: 'left',
                                                    fontSize: '0.9rem'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.backgroundColor = 'var(--surface-hover)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.backgroundColor = 'transparent';
                                                }}
                                            >
                                                <LogOut size={16} />
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        <ThemeToggle />
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                        style={{
                            display: 'none',
                            border: 'none',
                            background: 'transparent',
                            color: 'var(--text-main)',
                            cursor: 'pointer',
                            padding: '0.5rem'
                        }}
                        className="mobile-menu-btn"
                    >
                        {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation Menu */}
                {showMobileMenu && (
                    <div
                        style={{
                            display: 'none',
                            flexDirection: 'column',
                            gap: '0.5rem',
                            padding: '1rem',
                            borderTop: '1px solid var(--border)',
                            marginTop: '1rem'
                        }}
                        className="mobile-nav"
                    >
                        <Link
                            to="/"
                            onClick={() => setShowMobileMenu(false)}
                            style={navLinkStyle}
                        >
                            Home
                        </Link>
                        <Link
                            to="/jobs"
                            onClick={() => setShowMobileMenu(false)}
                            style={navLinkStyle}
                        >
                            Browse Jobs
                        </Link>
                        {!isAuthenticated ? (
                            <>
                                <Link
                                    to="/login"
                                    onClick={() => setShowMobileMenu(false)}
                                    style={navLinkStyle}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={() => setShowMobileMenu(false)}
                                    style={navLinkStyle}
                                >
                                    Register
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/dashboard"
                                    onClick={() => setShowMobileMenu(false)}
                                    style={navLinkStyle}
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        ...navLinkStyle,
                                        border: 'none',
                                        background: 'transparent',
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        color: 'var(--danger)'
                                    }}
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                )}
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
