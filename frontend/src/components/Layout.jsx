import { Outlet, Link } from 'react-router-dom';
import Footer from './Footer';
import ThemeToggle from './ThemeToggle';

// ✅ ONLY CHANGE: import new logo
import logo from '../assets/brand/logo/careerlink-logo-primary.png';

const Layout = () => {
    return (
        <div className="app-layout">
            <header style={{
                backgroundColor: 'var(--surface)',
                borderBottom: '1px solid var(--border)',
                padding: '1rem',
                position: 'sticky',
                top: 0,
                zIndex: 50,
                color: 'var(--text-main)'
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
                        {/* ✅ ONLY LINE CHANGED */}
                        <img
                            src={logo}
                            alt="CareerLink"
                            style={{ height: '110px', width: 'auto' }}
                        />
                    </Link>

                    <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <Link
                            to="/"
                            style={{ color: 'var(--text-main)', textDecoration: 'none', transition: 'color 0.2s' }}
                            onMouseEnter={(e) => e.target.style.color = 'var(--primary)'}
                            onMouseLeave={(e) => e.target.style.color = 'var(--text-main)'}
                        >
                            Home
                        </Link>
                        <Link
                            to="/jobs"
                            style={{ color: 'var(--text-main)', textDecoration: 'none', transition: 'color 0.2s' }}
                            onMouseEnter={(e) => e.target.style.color = 'var(--primary)'}
                            onMouseLeave={(e) => e.target.style.color = 'var(--text-main)'}
                        >
                            Browse Jobs
                        </Link>
                        <Link
                            to="/login"
                            style={{ color: 'var(--text-main)', textDecoration: 'none', transition: 'color 0.2s' }}
                            onMouseEnter={(e) => e.target.style.color = 'var(--primary)'}
                            onMouseLeave={(e) => e.target.style.color = 'var(--text-main)'}
                        >
                            Login
                        </Link>
                        <Link
                            to="/dashboard"
                            style={{ color: 'var(--text-main)', textDecoration: 'none', transition: 'color 0.2s' }}
                            onMouseEnter={(e) => e.target.style.color = 'var(--primary)'}
                            onMouseLeave={(e) => e.target.style.color = 'var(--text-main)'}
                        >
                            Dashboard
                        </Link>
                        <ThemeToggle />
                    </nav>
                </div>
            </header>

            <main style={{ minHeight: 'calc(100vh - 73px)' }}>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
