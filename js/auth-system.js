// Authentication System for Axis Tours and Travel
// Handles login, registration, and user management

import { 
  signUp, 
  signIn, 
  signOutUser, 
  resetPassword, 
  getCurrentUser 
} from './firebase-integration.js';

class AuthSystem {
  constructor() {
    this.currentUser = null;
    this.initializeAuth();
  }
  
  initializeAuth() {
    this.setupEventListeners();
    this.checkAuthState();
  }
  
  setupEventListeners() {
    // Login form
    const loginForm = document.querySelector('#login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleLogin();
      });
    }
    
    // Registration form
    const registerForm = document.querySelector('#register-form');
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleRegistration();
      });
    }
    
    // Logout buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('logout-btn')) {
        this.handleLogout();
      }
    });
    
    // Password reset
    const resetForm = document.querySelector('#reset-form');
    if (resetForm) {
      resetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handlePasswordReset();
      });
    }
    
    // Toggle between login and register
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('toggle-auth')) {
        this.toggleAuthMode();
      }
    });
  }
  
  checkAuthState() {
    // This will be called by Firebase auth state listener
    const user = getCurrentUser();
    if (user) {
      this.currentUser = user;
      this.updateUIForLoggedInUser();
    } else {
      this.currentUser = null;
      this.updateUIForLoggedOutUser();
    }
  }
  
  async handleLogin() {
    const email = document.querySelector('#login-email')?.value;
    const password = document.querySelector('#login-password')?.value;
    
    console.log('🔐 Login attempt:', { email, hasPassword: !!password });
    
    if (!email || !password) {
      this.showNotification('Please fill in all fields', 'error');
      return;
    }
    
    this.showLoading(true);
    
    try {
      console.log('🔄 Calling signIn function...');
      const result = await signIn(email, password);
      console.log('📋 SignIn result:', result);
      
      if (result.success) {
        console.log('✅ Login successful, redirecting...');
        this.showNotification('Login successful!', 'success');
        this.redirectAfterLogin();
      } else {
        console.log('❌ Login failed:', result.error);
        // Handle specific Firebase errors
        let errorMessage = result.error;
        if (result.error.includes('user-not-found')) {
          errorMessage = 'No account found with this email. Please register first.';
        } else if (result.error.includes('wrong-password')) {
          errorMessage = 'Incorrect password. Please try again.';
        } else if (result.error.includes('invalid-email')) {
          errorMessage = 'Please enter a valid email address.';
        } else if (result.error.includes('too-many-requests')) {
          errorMessage = 'Too many failed attempts. Please try again later.';
        }
        this.showNotification(errorMessage, 'error');
      }
    } catch (error) {
      console.error('💥 Login error:', error);
      this.showNotification('Login failed. Please try again.', 'error');
    } finally {
      this.showLoading(false);
    }
  }
  
  async handleRegistration() {
    const name = document.querySelector('#register-name')?.value;
    const email = document.querySelector('#register-email')?.value;
    const phone = document.querySelector('#register-phone')?.value;
    const password = document.querySelector('#register-password')?.value;
    const confirmPassword = document.querySelector('#register-confirm-password')?.value;
    
    if (!name || !email || !phone || !password || !confirmPassword) {
      this.showNotification('Please fill in all fields', 'error');
      return;
    }
    
    if (password !== confirmPassword) {
      this.showNotification('Passwords do not match', 'error');
      return;
    }
    
    if (password.length < 6) {
      this.showNotification('Password must be at least 6 characters', 'error');
      return;
    }
    
    this.showLoading(true);
    
    try {
      const result = await signUp(email, password, { name, phone });
      
      if (result.success) {
        this.showNotification('Registration successful! Welcome to Axis Tours!', 'success');
        this.redirectAfterLogin();
      } else {
        // Handle specific Firebase errors
        let errorMessage = result.error;
        if (result.error.includes('email-already-in-use')) {
          errorMessage = 'This email is already registered. Please try signing in instead.';
        } else if (result.error.includes('weak-password')) {
          errorMessage = 'Password is too weak. Please choose a stronger password.';
        } else if (result.error.includes('invalid-email')) {
          errorMessage = 'Please enter a valid email address.';
        }
        this.showNotification(errorMessage, 'error');
      }
    } catch (error) {
      this.showNotification('Registration failed. Please try again.', 'error');
    } finally {
      this.showLoading(false);
    }
  }
  
  async handleLogout() {
    try {
      const result = await signOutUser();
      
      if (result.success) {
        this.showNotification('Logged out successfully', 'success');
        this.redirectAfterLogout();
      } else {
        this.showNotification('Logout failed', 'error');
      }
    } catch (error) {
      this.showNotification('Logout failed. Please try again.', 'error');
    }
  }
  
  async handlePasswordReset() {
    const email = document.querySelector('#reset-email')?.value;
    
    if (!email) {
      this.showNotification('Please enter your email address', 'error');
      return;
    }
    
    this.showLoading(true);
    
    try {
      const result = await resetPassword(email);
      
      if (result.success) {
        this.showNotification('Password reset email sent! Check your inbox.', 'success');
        document.querySelector('#reset-email').value = '';
      } else {
        this.showNotification(result.error, 'error');
      }
    } catch (error) {
      this.showNotification('Password reset failed. Please try again.', 'error');
    } finally {
      this.showLoading(false);
    }
  }
  
  toggleAuthMode() {
    const loginForm = document.querySelector('#login-form');
    const registerForm = document.querySelector('#register-form');
    const resetForm = document.querySelector('#reset-form');
    const loginTab = document.querySelector('#login-tab');
    const registerTab = document.querySelector('#register-tab');
    const resetTab = document.querySelector('#reset-tab');
    
    if (loginForm && registerForm) {
      const isLoginVisible = loginForm.style.display !== 'none';
      
      if (isLoginVisible) {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        if (loginTab) loginTab.classList.remove('active');
        if (registerTab) registerTab.classList.add('active');
      } else {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        if (loginTab) loginTab.classList.add('active');
        if (registerTab) registerTab.classList.remove('active');
      }
    }
  }
  
  updateUIForLoggedInUser() {
    // Update navigation
    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.register-btn');
    const userMenu = document.querySelector('.user-menu');
    
    if (loginBtn) loginBtn.style.display = 'none';
    if (registerBtn) registerBtn.style.display = 'none';
    
    if (userMenu) {
      userMenu.style.display = 'block';
      const userName = userMenu.querySelector('.user-name');
      if (userName) {
        userName.textContent = this.currentUser?.displayName || this.currentUser?.email || 'User';
      }
    }
    
    // Show user-specific content
    const userContent = document.querySelectorAll('.user-only');
    userContent.forEach(element => {
      element.style.display = 'block';
    });
    
    // Hide auth forms if on auth pages
    const authPages = document.querySelector('.auth-page');
    if (authPages) {
      authPages.style.display = 'none';
    }
  }
  
  updateUIForLoggedOutUser() {
    // Update navigation
    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.register-btn');
    const userMenu = document.querySelector('.user-menu');
    
    if (loginBtn) loginBtn.style.display = 'block';
    if (registerBtn) registerBtn.style.display = 'block';
    
    if (userMenu) {
      userMenu.style.display = 'none';
    }
    
    // Hide user-specific content
    const userContent = document.querySelectorAll('.user-only');
    userContent.forEach(element => {
      element.style.display = 'none';
    });
  }
  
  redirectAfterLogin() {
    // Check if there's a redirect URL in the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get('redirect');
    
    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      // Default redirect based on current page
      const currentPage = window.location.pathname;
      
      if (currentPage.includes('login') || currentPage.includes('register')) {
        // Redirect to user dashboard instead of front page
        window.location.href = 'my-bookings.html';
      }
    }
  }
  
  redirectAfterLogout() {
    // Redirect to home page after logout
    window.location.href = 'index.html';
  }
  
  showLoading(show) {
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(element => {
      element.style.display = show ? 'block' : 'none';
    });
    
    const submitButtons = document.querySelectorAll('button[type="submit"]');
    submitButtons.forEach(button => {
      button.disabled = show;
      if (show) {
        button.textContent = 'Loading...';
      } else {
        button.textContent = button.dataset.originalText || 'Submit';
      }
    });
  }
  
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '15px 20px',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '600',
      zIndex: '10001',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease',
      maxWidth: '300px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
    });
    
    // Set background color based on type
    const colors = {
      success: 'linear-gradient(135deg, #51cf66, #40c057)',
      error: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
      info: 'linear-gradient(135deg, #339af0, #228be6)'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 4000);
  }
  
  // Public methods for external use
  getCurrentUser() {
    return this.currentUser;
  }
  
  isLoggedIn() {
    return this.currentUser !== null;
  }
  
  requireAuth() {
    if (!this.isLoggedIn()) {
      const currentUrl = encodeURIComponent(window.location.href);
      window.location.href = `login.html?redirect=${currentUrl}`;
      return false;
    }
    return true;
  }
}

// Initialize auth system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.authSystem = new AuthSystem();
});

export default AuthSystem;
