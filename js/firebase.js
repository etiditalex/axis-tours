// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, getDoc, updateDoc, deleteDoc, doc, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

// Your web app's Firebase configuration
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
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Authentication functions
export async function signUp(email, password, fullName) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Store additional user data in Firestore
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      email: user.email,
      full_name: fullName,
      created_at: new Date(),
      role: "partner" // Default role for hotel partners
    });
    
    return { user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
}

export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
}

export async function signOutUser() {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
}

export async function getCurrentUser() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

// Hotel management functions
export async function createHotel(hotelData) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const hotelWithPartner = {
      ...hotelData,
      partner_id: user.uid,
      created_at: new Date(),
      updated_at: new Date()
    };

    const docRef = await addDoc(collection(db, "hotels"), hotelWithPartner);
    return { id: docRef.id, ...hotelWithPartner, error: null };
  } catch (error) {
    return { error: error.message };
  }
}

export async function getHotels() {
  try {
    const querySnapshot = await getDocs(collection(db, "hotels"));
    const hotels = [];
    querySnapshot.forEach((doc) => {
      hotels.push({ id: doc.id, ...doc.data() });
    });
    return { data: hotels, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
}

export async function getPartnerHotels(partnerId) {
  try {
    const q = query(
      collection(db, "hotels"),
      where("partner_id", "==", partnerId),
      orderBy("created_at", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const hotels = [];
    querySnapshot.forEach((doc) => {
      hotels.push({ id: doc.id, ...doc.data() });
    });
    return { data: hotels, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
}

export async function updateHotel(hotelId, updates) {
  try {
    const hotelRef = doc(db, "hotels", hotelId);
    await updateDoc(hotelRef, {
      ...updates,
      updated_at: new Date()
    });
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
}

export async function deleteHotel(hotelId) {
  try {
    await deleteDoc(doc(db, "hotels", hotelId));
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
}

// Room management functions
export async function createRoom(roomData) {
  try {
    const roomWithTimestamp = {
      ...roomData,
      created_at: new Date(),
      updated_at: new Date()
    };

    const docRef = await addDoc(collection(db, "rooms"), roomWithTimestamp);
    return { id: docRef.id, ...roomWithTimestamp, error: null };
  } catch (error) {
    return { error: error.message };
  }
}

export async function getRooms(hotelId) {
  try {
    const q = query(
      collection(db, "rooms"),
      where("hotel_id", "==", hotelId),
      orderBy("created_at", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const rooms = [];
    querySnapshot.forEach((doc) => {
      rooms.push({ id: doc.id, ...doc.data() });
    });
    return { data: rooms, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
}

export async function updateRoom(roomId, updates) {
  try {
    const roomRef = doc(db, "rooms", roomId);
    await updateDoc(roomRef, {
      ...updates,
      updated_at: new Date()
    });
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
}

export async function deleteRoom(roomId) {
  try {
    await deleteDoc(doc(db, "rooms", roomId));
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
}

// Booking functions
export async function createBooking(bookingData) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const bookingWithUser = {
      ...bookingData,
      user_id: user.uid,
      created_at: new Date(),
      updated_at: new Date(),
      status: "pending"
    };

    const docRef = await addDoc(collection(db, "bookings"), bookingWithUser);
    return { id: docRef.id, ...bookingWithUser, error: null };
  } catch (error) {
    return { error: error.message };
  }
}

export async function getUserBookings(userId) {
  try {
    const q = query(
      collection(db, "bookings"),
      where("user_id", "==", userId),
      orderBy("created_at", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const bookings = [];
    querySnapshot.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() });
    });
    return { data: bookings, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
}

// File upload functions
export async function uploadImage(file, path) {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return { url: downloadURL, error: null };
  } catch (error) {
    return { url: null, error: error.message };
  }
}

export async function deleteImage(path) {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
}

// Real-time subscriptions
export function subscribeToHotels(callback) {
  const q = query(collection(db, "hotels"), orderBy("created_at", "desc"));
  return onSnapshot(q, (querySnapshot) => {
    const hotels = [];
    querySnapshot.forEach((doc) => {
      hotels.push({ id: doc.id, ...doc.data() });
    });
    callback(hotels);
  });
}

export function subscribeToRooms(hotelId, callback) {
  const q = query(
    collection(db, "rooms"),
    where("hotel_id", "==", hotelId),
    orderBy("created_at", "desc")
  );
  
  return onSnapshot(q, (querySnapshot) => {
    const rooms = [];
    querySnapshot.forEach((doc) => {
      rooms.push({ id: doc.id, ...doc.data() });
    });
    callback(rooms);
  });
}

// Utility functions
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES'
  }).format(amount);
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function generateBookingId() {
  return 'BK' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
}

// Export Firebase instances for direct use if needed
export { app, auth, db, storage, analytics };
