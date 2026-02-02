/* 
 * Toast Notification System - Quick Reference
 * 
 * This is a React 19 compatible custom toast notification system.
 * No external dependencies required!
 */

// ============================================
// BASIC USAGE
// ============================================

import { useToast } from '../components/Toast';

function MyComponent() {
  const toast = useToast();

  const handleClick = () => {
    toast.success('Operation successful!');
  };

  return <button onClick={handleClick}>Click me</button>;
}

// ============================================
// ALL TOAST TYPES
// ============================================

// Success (Green) - For successful operations
toast.success('Profile updated successfully!');

// Error (Red) - For errors and failures
toast.error('Failed to save changes');

// Warning (Orange) - For warnings and cautions
toast.warning('This action cannot be undone');

// Info (Blue) - For informational messages
toast.info('New features available');

// ============================================
// CUSTOM DURATION
// ============================================

// Short duration (2 seconds)
toast.success('Quick message', 2000);

// Long duration (6 seconds)
toast.error('Important message', 6000);

// No auto-dismiss (stays until manually closed)
toast.info('Manual close required', 0);

// Default duration (4 seconds) - omit second parameter
toast.success('Default duration');

// ============================================
// COMMON PATTERNS
// ============================================

// 1. Form Validation
function handleSubmit(e) {
  e.preventDefault();
  
  if (!email) {
    toast.warning('Please enter your email');
    return;
  }
  
  if (!password) {
    toast.warning('Please enter your password');
    return;
  }
  
  // Continue with submission...
}

// 2. API Calls
async function fetchData() {
  try {
    const response = await api.get('/data');
    toast.success('Data loaded successfully');
  } catch (error) {
    toast.error('Failed to load data');
  }
}

// 3. HTTP Status Code Handling
async function makeRequest() {
  try {
    await api.post('/endpoint', data);
    toast.success('Request successful');
  } catch (error) {
    if (error.response?.status === 401) {
      toast.error('Please login to continue');
    } else if (error.response?.status === 403) {
      toast.error('You do not have permission');
    } else if (error.response?.status === 429) {
      toast.warning('Too many requests. Try again later');
    } else if (error.code === 'ERR_NETWORK') {
      toast.error('Network error. Check your connection');
    } else {
      toast.error('Something went wrong');
    }
  }
}

// 4. Long-Running Operations
async function uploadFile(file) {
  toast.info('Uploading file...', 0); // Show indefinitely
  
  try {
    await api.post('/upload', formData);
    toast.success('File uploaded successfully');
  } catch (error) {
    toast.error('Upload failed');
  }
}

// 5. User Actions Confirmation
function handleDelete() {
  // Show confirmation, then delete
  if (confirm('Are you sure?')) {
    deleteItem()
      .then(() => toast.success('Item deleted'))
      .catch(() => toast.error('Failed to delete'));
  }
}

// 6. Multiple Sequential Operations
async function processItems(items) {
  toast.info(`Processing ${items.length} items...`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const item of items) {
    try {
      await processItem(item);
      successCount++;
    } catch (error) {
      errorCount++;
    }
  }
  
  if (errorCount === 0) {
    toast.success(`All ${successCount} items processed successfully!`);
  } else {
    toast.warning(`Processed ${successCount}, failed ${errorCount}`);
  }
}

// 7. Authentication Flow
async function login(credentials) {
  try {
    const response = await api.post('/login', credentials);
    const user = response.data;
    
    toast.success(`Welcome back, ${user.username}!`);
    // Redirect or update state
  } catch (error) {
    if (error.response?.status === 401) {
      toast.error('Invalid username or password');
    } else if (error.response?.status === 429) {
      toast.warning('Too many login attempts. Please wait');
    } else {
      toast.error('Login failed. Please try again');
    }
  }
}

// 8. Registration Flow
async function register(userData) {
  try {
    await api.post('/register', userData);
    toast.success('Account created! Please login');
    // Navigate to login
  } catch (error) {
    if (error.response?.status === 409) {
      toast.error('Username or email already exists');
    } else if (error.response?.status === 400) {
      const msg = error.response.data.message;
      toast.error(msg || 'Invalid registration data');
    } else {
      toast.error('Registration failed. Please try again');
    }
  }
}

// ============================================
// BEST PRACTICES
// ============================================

// ✅ DO: Keep messages short and clear
toast.success('Saved!');
toast.error('Failed to save');

// ❌ DON'T: Use overly long messages
toast.success('Your profile has been successfully updated and all your changes have been saved to the database');

// ✅ DO: Use appropriate toast types
toast.warning('Unsaved changes will be lost');  // For warnings
toast.error('Server error');                     // For errors

// ❌ DON'T: Misuse toast types
toast.success('Error occurred');  // Wrong! Use error type
toast.error('Success!');           // Wrong! Use success type

// ✅ DO: Provide context in error messages
toast.error('Failed to delete job posting');

// ❌ DON'T: Use generic error messages
toast.error('Error');

// ✅ DO: Use warnings for user actions
toast.warning('This will delete all your data');

// ✅ DO: Set appropriate durations
toast.success('Quick message', 2000);     // Fast operations
toast.error('Important error', 6000);     // Critical messages
toast.info('Loading...', 0);              // Ongoing operations

// ============================================
// ANIMATION & STYLING
// ============================================

/*
 * Toasts automatically:
 * - Slide in from the right
 * - Stack vertically
 * - Auto-dismiss after duration
 * - Can be manually closed
 * - Support dark mode
 * - Are responsive on mobile
 * 
 * Customize in Toast.css if needed
 */

// ============================================
// TROUBLESHOOTING
// ============================================

// Problem: Toast not showing
// Solution: Make sure ToastProvider wraps your component in App.jsx

// Problem: "useToast must be used within a ToastProvider"
// Solution: Verify ToastProvider is in your component tree

// Problem: Toast appears in wrong location
// Solution: Check z-index and CSS conflicts in Toast.css

// Problem: Multiple toasts overlap
// Solution: This is expected behavior. They stack vertically.

export {}; // Make this a module
