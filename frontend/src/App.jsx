import React from 'react';
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import PropTypes from 'prop-types';

// Layout & Context
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './components/Toast';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import JobList from './pages/JobList';
import JobDetail from './pages/JobDetail';
import Dashboard from './pages/Dashboard';
import CreateJob from './pages/CreateJob';
import NotFound from './pages/NotFound';

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
            {/* 2. Main Layout Wrapper: Holds the Navbar and Footer */}
            <Route path="/" element={<Layout />}>

              {/* Public Routes */}
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="jobs" element={<JobList />} />
              <Route path="jobs/:id" element={<JobDetail />} />

              {/* 3. Protected Routes: Only for logged-in users */}
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="post-job"
                element={
                  <ProtectedRoute>
                    <CreateJob />
                  </ProtectedRoute>
                }
              />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
