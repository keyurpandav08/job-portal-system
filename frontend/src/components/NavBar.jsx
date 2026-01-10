import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { Briefcase, LayoutDashboard, LogOut, User, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AppNavbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Helper to check if a link is active for styling
    const isActive = (path) => location.pathname === path;

    return (
        <Navbar expand="lg" bg="white" className="border-bottom sticky-top py-2 shadow-sm">
            <Container>
                {/* Brand Logo */}
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 fw-bold text-primary">
                    <div className="bg-primary text-white p-1 rounded-2 d-flex align-items-center justify-content-center">
                        <Briefcase size={20} />
                    </div>
                    <span style={{ letterSpacing: '-0.5px', fontSize: '1.25rem', color: 'var(--dark-slate)' }}>
                        Job<span className="text-primary">Portal</span>
                    </span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="main-navbar" className="border-0 shadow-none" />

                <Navbar.Collapse id="main-navbar">
                    <Nav className="me-auto ms-lg-4 gap-2">
                        <Nav.Link 
                            as={Link} 
                            to="/jobs" 
                            className={`fw-medium ${isActive('/jobs') ? 'text-primary' : 'text-secondary'}`}
                        >
                            Explore Jobs
                        </Nav.Link>
                        {user?.roleName === 'EMPLOYER' && (
                            <Nav.Link 
                                as={Link} 
                                to="/post-job" 
                                className={`fw-medium ${isActive('/post-job') ? 'text-primary' : 'text-secondary'}`}
                            >
                                Post a Job
                            </Nav.Link>
                        )}
                    </Nav>

                    <Nav className="align-items-center gap-2">
                        {user ? (
                            <>
                                <Nav.Link 
                                    as={Link} 
                                    to="/dashboard" 
                                    className={`d-flex align-items-center gap-2 fw-medium me-3 ${isActive('/dashboard') ? 'text-primary' : 'text-secondary'}`}
                                >
                                    <LayoutDashboard size={18} />
                                    Dashboard
                                </Nav.Link>

                                <NavDropdown 
                                    title={
                                        <span className="d-inline-flex align-items-center gap-2 fw-bold text-dark">
                                            <div className="bg-light rounded-circle p-1 border">
                                                <User size={18} className="text-primary" />
                                            </div>
                                            {user.username}
                                        </span>
                                    } 
                                    id="user-nav-dropdown"
                                    align="end"
                                >
                                    <NavDropdown.Header>Account Settings</NavDropdown.Header>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleLogout} className="text-danger d-flex align-items-center gap-2 py-2">
                                        <LogOut size={16} /> Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            <div className="d-flex gap-2">
                                <Link to="/login" className="btn btn-link text-decoration-none text-secondary fw-medium">
                                    Sign In
                                </Link>
                                <Link to="/register" className="btn btn-primary px-4 fw-bold shadow-sm rounded-pill">
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;