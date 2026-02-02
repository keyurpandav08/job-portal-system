import React from 'react';
import { useToast } from '../components/Toast';
import './Auth.css';

/**
 * Toast Demo Component
 * 
 * This component demonstrates all toast notification types and features.
 * Use this as a reference or for testing the toast system.
 * 
 * To use: Add a route in App.jsx:
 * <Route path="toast-demo" element={<ToastDemo />} />
 * 
 * Then visit: http://localhost:5173/toast-demo
 */

const ToastDemo = () => {
  const toast = useToast();

  return (
    <div className="register-container py-5">
      <div className="register-card p-4 p-md-5" style={{ maxWidth: '600px' }}>
        <div className="register-header mb-4">
          <h2 className="fw-bold text-slate-900 mb-2">🎨 Toast Notification Demo</h2>
          <p className="text-secondary small">
            Click the buttons below to see different toast notifications
          </p>
        </div>

        <div className="d-flex flex-column gap-3">
          {/* Success Toasts */}
          <div>
            <h5 className="fw-semibold mb-2">✅ Success Toasts (Green)</h5>
            <div className="d-flex flex-wrap gap-2">
              <button
                onClick={() => toast.success('Operation completed successfully!')}
                className="btn btn-success"
              >
                Success
              </button>
              <button
                onClick={() => toast.success('Profile updated!', 2000)}
                className="btn btn-success"
              >
                Quick (2s)
              </button>
              <button
                onClick={() => toast.success('Important success message', 6000)}
                className="btn btn-success"
              >
                Long (6s)
              </button>
            </div>
          </div>

          {/* Error Toasts */}
          <div>
            <h5 className="fw-semibold mb-2">❌ Error Toasts (Red)</h5>
            <div className="d-flex flex-wrap gap-2">
              <button
                onClick={() => toast.error('Operation failed!')}
                className="btn btn-danger"
              >
                Error
              </button>
              <button
                onClick={() => toast.error('Invalid username or password')}
                className="btn btn-danger"
              >
                Login Error
              </button>
              <button
                onClick={() => toast.error('Network error. Please try again')}
                className="btn btn-danger"
              >
                Network Error
              </button>
            </div>
          </div>

          {/* Warning Toasts */}
          <div>
            <h5 className="fw-semibold mb-2">⚠️ Warning Toasts (Orange)</h5>
            <div className="d-flex flex-wrap gap-2">
              <button
                onClick={() => toast.warning('This action cannot be undone')}
                className="btn btn-warning"
              >
                Warning
              </button>
              <button
                onClick={() => toast.warning('Please enter your email')}
                className="btn btn-warning"
              >
                Validation
              </button>
              <button
                onClick={() => toast.warning('Too many requests. Please wait')}
                className="btn btn-warning"
              >
                Rate Limit
              </button>
            </div>
          </div>

          {/* Info Toasts */}
          <div>
            <h5 className="fw-semibold mb-2">ℹ️ Info Toasts (Blue)</h5>
            <div className="d-flex flex-wrap gap-2">
              <button
                onClick={() => toast.info('Check your email for verification')}
                className="btn btn-info text-white"
              >
                Info
              </button>
              <button
                onClick={() => toast.info('New features available!')}
                className="btn btn-info text-white"
              >
                Announcement
              </button>
              <button
                onClick={() => toast.info('Loading...', 0)}
                className="btn btn-info text-white"
              >
                Loading (No dismiss)
              </button>
            </div>
          </div>

          {/* Multiple Toasts */}
          <div>
            <h5 className="fw-semibold mb-2">🔄 Multiple Toasts</h5>
            <button
              onClick={() => {
                toast.info('Starting process...');
                setTimeout(() => toast.warning('Step 1 completed'), 500);
                setTimeout(() => toast.warning('Step 2 completed'), 1000);
                setTimeout(() => toast.success('All steps completed!'), 1500);
              }}
              className="btn btn-primary"
            >
              Show Multiple Toasts
            </button>
          </div>

          {/* Real-World Examples */}
          <div className="mt-3 border-top pt-3">
            <h5 className="fw-semibold mb-2">🌟 Real-World Scenarios</h5>
            
            <div className="d-flex flex-column gap-2">
              <button
                onClick={() => {
                  // Simulate login flow
                  toast.info('Authenticating...');
                  setTimeout(() => {
                    toast.success('Welcome back, John Doe!');
                  }, 1500);
                }}
                className="btn btn-outline-primary"
              >
                🔐 Simulate Login Success
              </button>

              <button
                onClick={() => {
                  // Simulate failed login
                  toast.error('Invalid username or password');
                }}
                className="btn btn-outline-danger"
              >
                🚫 Simulate Login Error
              </button>

              <button
                onClick={() => {
                  // Simulate form validation
                  toast.warning('Please fill in all required fields');
                }}
                className="btn btn-outline-warning"
              >
                📝 Simulate Form Validation
              </button>

              <button
                onClick={() => {
                  // Simulate file upload
                  toast.info('Uploading file...', 0);
                  setTimeout(() => {
                    toast.success('File uploaded successfully!');
                  }, 3000);
                }}
                className="btn btn-outline-success"
              >
                📤 Simulate File Upload
              </button>

              <button
                onClick={() => {
                  // Simulate network error
                  toast.error('Unable to connect to server. Please check your internet connection');
                }}
                className="btn btn-outline-secondary"
              >
                🌐 Simulate Network Error
              </button>
            </div>
          </div>

          {/* Custom Durations */}
          <div className="mt-3 border-top pt-3">
            <h5 className="fw-semibold mb-2">⏱️ Custom Durations</h5>
            <div className="d-flex flex-wrap gap-2">
              <button
                onClick={() => toast.success('1 second', 1000)}
                className="btn btn-sm btn-outline-primary"
              >
                1s
              </button>
              <button
                onClick={() => toast.success('2 seconds', 2000)}
                className="btn btn-sm btn-outline-primary"
              >
                2s
              </button>
              <button
                onClick={() => toast.success('3 seconds', 3000)}
                className="btn btn-sm btn-outline-primary"
              >
                3s
              </button>
              <button
                onClick={() => toast.success('Default (4s)')}
                className="btn btn-sm btn-outline-primary"
              >
                4s (default)
              </button>
              <button
                onClick={() => toast.success('5 seconds', 5000)}
                className="btn btn-sm btn-outline-primary"
              >
                5s
              </button>
              <button
                onClick={() => toast.info('Manual close only', 0)}
                className="btn btn-sm btn-outline-primary"
              >
                ∞ (no auto-dismiss)
              </button>
            </div>
          </div>

          {/* Documentation Links */}
          <div className="mt-4 p-3 bg-light rounded">
            <h6 className="fw-semibold mb-2">📚 Documentation</h6>
            <ul className="small mb-0">
              <li>
                <strong>Usage Guide:</strong>{' '}
                <code>/frontend/TOAST_USAGE.md</code>
              </li>
              <li>
                <strong>Code Examples:</strong>{' '}
                <code>/frontend/src/components/ToastExamples.js</code>
              </li>
              <li>
                <strong>Component:</strong>{' '}
                <code>/frontend/src/components/Toast.jsx</code>
              </li>
            </ul>
          </div>

          {/* Code Example */}
          <div className="mt-3 p-3 bg-dark text-light rounded">
            <h6 className="fw-semibold mb-2 text-white">💻 Quick Start Code</h6>
            <pre className="mb-0 small" style={{ whiteSpace: 'pre-wrap' }}>
{`import { useToast } from '../components/Toast';

function MyComponent() {
  const toast = useToast();
  
  return (
    <button onClick={() => toast.success('Hello!')}>
      Show Toast
    </button>
  );
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToastDemo;
