import { Outlet, Link } from 'react-router-dom';
import Footer from './Footer';
import ThemeToggle from './ThemeToggle';

const Layout = () => {
    return (
        <div className="app-layout">
            <header style={{
                backgroundColor: 'var(--surface)',
                borderBottom: '1px solid var(--border)',
                padding: '1rem',
                position: 'sticky',
                top: 0,
                zIndex: 50
            }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                        <img src="/logo.png" alt="CareerLink" style={{ height: '70px', width: 'auto' }} />
                    </Link>
                    <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <Link to="/">Home</Link>
                        <Link to="/jobs">Browse Jobs</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/dashboard">Dashboard</Link>
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
