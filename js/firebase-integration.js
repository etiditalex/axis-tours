// Firebase Integration for Axis Tours and Travel
// This file handles all Firebase operations including Firestore and Authentication

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { 
  getFirestore, 
  collection, 
  doc, 
  addDoc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  onSnapshot,
  serverTimestamp 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmV9pP1SlU4_aImgXIfyry8MDfY9REOGQ",
  authDomain: "axis-tours-backend.firebaseapp.com",
  projectId: "axis-tours-backend",
  storageBucket: "axis-tours-backend.firebasestorage.app",
  messagingSenderId: "819434211204",
  appId: "1:819434211204:web:1af38ca9ad66c285867fd1",
  measurementId: "G-PFZRZ3DSYE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Global state
let currentUser = null;
let userBookings = [];
let allServices = {
  hotels: [],
  tours: [],
  safaris: [],
  experiences: [],
  transfers: []
};

// Initialize Firebase services
export const initializeFirebase = async () => {
  try {
    // Set up authentication state listener
    onAuthStateChanged(auth, (user) => {
      currentUser = user;
      if (user) {
        console.log('User signed in:', user.email);
        loadUserBookings();
        updateUIForLoggedInUser();
      } else {
        console.log('User signed out');
        updateUIForLoggedOutUser();
      }
    });

    // Load initial data
    await loadAllServices();
    
    console.log('Firebase initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    return false;
  }
};

// Authentication functions
export const signUp = async (email, password, userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update user profile
    await updateProfile(user, {
      displayName: userData.name
    });
    
    // Create user document in Firestore
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      email: user.email,
      name: userData.name,
      phone: userData.phone,
      createdAt: serverTimestamp(),
      isAdmin: false
    });
    
    return { success: true, user };
  } catch (error) {
    console.error('Sign up error:', error);
    return { success: false, error: error.message };
  }
};

export const signIn = async (email, password) => {
  try {
    console.log('🔥 Firebase signIn called with:', { email, hasPassword: !!password });
    console.log('🔥 Auth object:', auth);
    console.log('🔥 Auth app:', auth.app);
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('🔥 Sign in successful:', userCredential.user);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('🔥 Sign in error:', error);
    console.error('🔥 Error code:', error.code);
    console.error('🔥 Error message:', error.message);
    return { success: false, error: error.message };
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Sign out error:', error);
    return { success: false, error: error.message };
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    console.error('Password reset error:', error);
    return { success: false, error: error.message };
  }
};

// Firestore functions
export const createBooking = async (bookingData) => {
  try {
    if (!currentUser) {
      throw new Error('User must be logged in to create a booking');
    }
    
    const booking = {
      ...bookingData,
      userId: currentUser.uid,
      userEmail: currentUser.email,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'bookings'), booking);
    console.log('Booking created with ID:', docRef.id);
    
    // Reload user bookings
    await loadUserBookings();
    
    return { success: true, bookingId: docRef.id };
  } catch (error) {
    console.error('Error creating booking:', error);
    return { success: false, error: error.message };
  }
};

export const updateBookingStatus = async (bookingId, status) => {
  try {
    const bookingRef = doc(db, 'bookings', bookingId);
    await updateDoc(bookingRef, {
      status: status,
      updatedAt: serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error updating booking:', error);
    return { success: false, error: error.message };
  }
};

export const loadUserBookings = async () => {
  try {
    if (!currentUser) return;
    
    const q = query(
      collection(db, 'bookings'),
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    userBookings = [];
    
    querySnapshot.forEach((doc) => {
      userBookings.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    console.log('User bookings loaded:', userBookings.length);
    return userBookings;
  } catch (error) {
    console.error('Error loading user bookings:', error);
    return [];
  }
};

export const loadAllServices = async () => {
  try {
    const services = ['hotels', 'tours', 'safaris', 'experiences', 'transfers'];
    
    for (const service of services) {
      const querySnapshot = await getDocs(collection(db, service));
      allServices[service] = [];
      
      querySnapshot.forEach((doc) => {
        allServices[service].push({
          id: doc.id,
          ...doc.data()
        });
      });
    }
    
    console.log('All services loaded:', allServices);
    return allServices;
  } catch (error) {
    console.error('Error loading services:', error);
    return allServices;
  }
};

export const searchServices = (searchTerm, serviceType = null) => {
  const results = [];
  const term = searchTerm.toLowerCase();
  
  const servicesToSearch = serviceType ? [serviceType] : Object.keys(allServices);
  
  servicesToSearch.forEach(service => {
    allServices[service].forEach(item => {
      if (
        item.name?.toLowerCase().includes(term) ||
        item.location?.toLowerCase().includes(term) ||
        item.description?.toLowerCase().includes(term) ||
        item.destination?.toLowerCase().includes(term)
      ) {
        results.push({
          ...item,
          serviceType: service
        });
      }
    });
  });
  
  return results;
};

export const getServiceById = async (serviceType, serviceId) => {
  try {
    const docRef = doc(db, serviceType, serviceId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting service:', error);
    return null;
  }
};

export const addReview = async (reviewData) => {
  try {
    if (!currentUser) {
      throw new Error('User must be logged in to add a review');
    }
    
    const review = {
      ...reviewData,
      userId: currentUser.uid,
      userEmail: currentUser.email,
      userName: currentUser.displayName || 'Anonymous',
      createdAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'reviews'), review);
    console.log('Review added with ID:', docRef.id);
    
    return { success: true, reviewId: docRef.id };
  } catch (error) {
    console.error('Error adding review:', error);
    return { success: false, error: error.message };
  }
};

export const getReviews = async (serviceId) => {
  try {
    const q = query(
      collection(db, 'reviews'),
      where('serviceId', '==', serviceId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const reviews = [];
    
    querySnapshot.forEach((doc) => {
      reviews.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return reviews;
  } catch (error) {
    console.error('Error getting reviews:', error);
    return [];
  }
};

// UI Update functions
const updateUIForLoggedInUser = () => {
  // Update navigation
  const loginBtn = document.querySelector('.login-btn');
  const registerBtn = document.querySelector('.register-btn');
  const userMenu = document.querySelector('.user-menu');
  
  if (loginBtn) loginBtn.style.display = 'none';
  if (registerBtn) registerBtn.style.display = 'none';
  
  if (userMenu) {
    userMenu.style.display = 'block';
    const userName = userMenu.querySelector('.user-name');
    if (userName) userName.textContent = currentUser.displayName || currentUser.email;
  }
  
  // Show user-specific content
  const userContent = document.querySelectorAll('.user-only');
  userContent.forEach(element => {
    element.style.display = 'block';
  });
};

const updateUIForLoggedOutUser = () => {
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
};

// Utility functions
export const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A';
  
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

export const getCurrentUser = () => currentUser;
export const getUserBookings = () => userBookings;
export const getAllServices = () => allServices;

// Initialize Firebase when the module loads
document.addEventListener('DOMContentLoaded', () => {
  initializeFirebase();
});