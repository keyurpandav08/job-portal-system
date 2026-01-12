import React from 'react';
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';

// Layout & Context
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import JobList from './pages/JobList';
import JobDetail from './pages/JobDetail';

import Dashboard from './pages/Dashboard';
import CreateJob from './pages/CreateJob';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import PropTypes from 'prop-types';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* 1. Global Toaster: Accessible from any component or API call */}
        {/* <Toaster 
          position="top-center" 
          toastOptions={{
            duration: 4000,
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }} 
        /> */}

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

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="jobs" element={<JobList />} />
              <Route path="jobs/:id" element={<JobDetail />} />
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
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}


export default App;
