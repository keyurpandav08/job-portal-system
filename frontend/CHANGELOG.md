# Changelog

## 🚀 Refactoring & UI Improvements

### **Authentication Pages (`Login.jsx` & `Register.jsx`)**
- **Modern Card Layout**: Centered forms on the page with a clean, professional card design (`max-w-md`).
- **Input Field Enhancements**: Moved icons (User, Lock, Mail, etc.) *inside* the input fields as left-side adornments for a sleeker look.
- **Consistent Styling**: Created `Auth.css` to share styles between Login and Register pages, ensuring a unified design system.
- **Button Styling**: Standardized primary buttons to be full-width with consistent padding and hover effects.
- **Role Selection**: Improved the visual distinction between "Candidate" and "Employer" toggle buttons on the registration page.

### **Footer (`Footer.jsx`)**
- **Grid Layout**: Converted the footer into a responsive 4-column grid (Brand/Info, Candidates, Employers, Contact) to match professional standards (e.g., Indeed).
- **Social Icons**: Aligned social media links into a clean, horizontal row.
- **Bottom Bar**: Restructured the copyright and legal links into a dedicated bottom bar.
- **Visual Hierarchy**: Improved typography with bold section headers and muted text colors.

## 🐛 Bug Fixes & Configuration

### **Runtime Crash Fix**
- **Resolved "Invalid Hook Call"**: Diagnosed and fixed a critical runtime error caused by `react-hot-toast` incompatibility with React 19. The `Toaster` component was temporarily removed to allow the app to load.

### **Layout System**
- **Bootstrap Enabled**: Added `import 'bootstrap/dist/css/bootstrap.min.css'` to `main.jsx`. This enabled the Bootstrap grid system, fixing the issue where footer columns were stacking vertically instead of displaying side-by-side.
