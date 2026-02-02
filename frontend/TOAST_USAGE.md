# Toast Notification System

This project uses a custom React 19 compatible toast notification system.

## Features

- ✅ **React 19 Compatible** - Built with modern React features
- 🎨 **Beautiful Gradients** - Eye-catching gradient designs for each toast type
- 🌓 **Dark Mode Support** - Automatically adapts to dark mode
- 📱 **Responsive** - Works great on mobile and desktop
- ♿ **Accessible** - ARIA labels and keyboard support
- ⚡ **Lightweight** - No external dependencies
- 🎯 **Easy to Use** - Simple API similar to popular toast libraries

## Usage

### 1. Basic Usage

Import the `useToast` hook in any component:

```jsx
import { useToast } from '../components/Toast';

function MyComponent() {
  const toast = useToast();

  const handleClick = () => {
    toast.success('Operation successful!');
  };

  return <button onClick={handleClick}>Show Toast</button>;
}
```

### 2. Toast Types

```jsx
const toast = useToast();

// Success toast (green)
toast.success('Profile updated successfully!');

// Error toast (red)
toast.error('Failed to save changes');

// Warning toast (orange)
toast.warning('This action cannot be undone');

// Info toast (blue)
toast.info('Check your email for verification');
```

### 3. Custom Duration

By default, toasts disappear after 4 seconds. You can customize the duration:

```jsx
// Show for 2 seconds
toast.success('Quick message!', 2000);

// Show for 6 seconds
toast.error('Important error message', 6000);

// Show indefinitely (0 = no auto-dismiss)
toast.info('This will stay until manually closed', 0);
```

### 4. Real-World Examples

#### Login Success/Error

```jsx
import { useToast } from '../components/Toast';
import api from '../services/api';

function Login() {
  const toast = useToast();

  const handleLogin = async (credentials) => {
    try {
      const response = await api.post('/api/auth/login', credentials);
      toast.success('Login successful! Redirecting...');
      // Redirect to dashboard
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    // Your login form...
  );
}
```

#### Form Validation

```jsx
const handleSubmit = (e) => {
  e.preventDefault();
  
  if (!formData.email) {
    toast.warning('Please enter your email');
    return;
  }
  
  if (!formData.password) {
    toast.warning('Please enter your password');
    return;
  }
  
  // Continue with submission...
};
```

#### API Errors

```jsx
try {
  const response = await api.post('/api/jobs', jobData);
  toast.success('Job posted successfully!');
} catch (error) {
  if (error.response?.status === 401) {
    toast.error('Please login to post a job');
  } else if (error.response?.status === 403) {
    toast.error('You do not have permission to post jobs');
  } else if (error.response?.status === 429) {
    toast.warning('Too many requests. Please try again later');
  } else {
    toast.error('Failed to post job. Please try again');
  }
}
```

#### Multiple Operations

```jsx
const handleBatchDelete = async (ids) => {
  toast.info('Deleting items...', 0); // Show indefinitely
  
  try {
    await api.delete('/api/items/batch', { data: { ids } });
    toast.success(`Successfully deleted ${ids.length} items`);
  } catch (error) {
    toast.error('Failed to delete some items');
  }
};
```

#### File Upload Progress

```jsx
const handleUpload = async (file) => {
  const toastId = toast.info('Uploading file...', 0);
  
  try {
    await api.post('/api/upload', formData, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        // Update progress UI...
      }
    });
    
    toast.success('File uploaded successfully!');
  } catch (error) {
    toast.error('Upload failed');
  }
};
```

## Styling

The toast system comes with pre-configured styles in `Toast.css`. You can customize colors and animations by modifying this file.

### Toast Types and Colors

- **Success**: Green gradient (#10b981 → #059669)
- **Error**: Red gradient (#ef4444 → #dc2626)
- **Warning**: Orange gradient (#f59e0b → #d97706)
- **Info**: Blue gradient (#3b82f6 → #2563eb)

### Customization

To customize toast styles, edit `/frontend/src/components/Toast.css`:

```css
/* Change toast width */
.toast {
  min-width: 350px; /* Default: 300px */
}

/* Change animation speed */
@keyframes slideIn {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Custom success color */
.toast-success {
  background: linear-gradient(135deg, #your-color-1, #your-color-2);
}
```

## Best Practices

1. **Keep messages short** - Toast messages should be concise
2. **Use appropriate types** - Match the toast type to the message
3. **Don't spam** - Avoid showing multiple toasts at once
4. **Provide actions** - For important errors, consider showing a retry button
5. **Set appropriate durations** - Short messages: 2-3s, Important: 5-6s

## Migration from react-hot-toast

If you're migrating from `react-hot-toast`, the API is very similar:

```jsx
// Old (react-hot-toast)
import toast from 'react-hot-toast';
toast.success('Success!');

// New (our custom toast)
import { useToast } from '../components/Toast';
const toast = useToast();
toast.success('Success!');
```

The main difference is that you need to use the hook instead of importing a function directly.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- All modern mobile browsers

## Accessibility

- Toast messages are announced to screen readers
- Close buttons have proper ARIA labels
- Keyboard navigation support
- High contrast mode compatible
