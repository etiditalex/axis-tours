# 🔥 Firebase Backend Setup Guide

## ✅ **What's Already Done:**
- ✅ Firebase npm package installed
- ✅ Firebase configuration files created
- ✅ Integration code ready

## 🚀 **Next Steps in Firebase Console:**

### **Step 1: Enable Authentication**
1. **Go to**: [console.firebase.google.com](https://console.firebase.google.com)
2. **Select your project**: `axis-tours-backend`
3. **Click "Authentication"** in the left sidebar
4. **Click "Get started"**
5. **Click "Sign-in method"** tab
6. **Enable "Email/Password"** provider
7. **Click "Save"**

### **Step 2: Enable Firestore Database**
1. **Click "Firestore Database"** in the left sidebar
2. **Click "Create database"**
3. **Choose "Start in test mode"** (we'll secure it later)
4. **Choose location**: Europe-west1 (closest to Kenya)
5. **Click "Done"**

### **Step 3: Enable Storage**
1. **Click "Storage"** in the left sidebar
2. **Click "Get started"**
3. **Choose "Start in test mode"**
4. **Choose location**: Same as database
5. **Click "Done"**

## 🔧 **What You Get:**
- ✅ **User Authentication**: Sign up, login, logout
- ✅ **Real Database**: Store hotels, rooms, bookings
- ✅ **File Storage**: Upload hotel images
- ✅ **Real-time Updates**: Live data across all users
- ✅ **Security**: Built-in user management

## 📱 **Test Your Setup:**
1. **Open your website**
2. **Go to Partner Portal**
3. **Try to sign up** with a new account
4. **Check browser console** for any errors

## 🎯 **Your Firebase Config (Already Set):**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDmV9pP1SlU4_aImgXIfyry8MDfY9REOGQ",
  authDomain: "axis-tours-backend.firebaseapp.com",
  projectId: "axis-tours-backend",
  storageBucket: "axis-tours-backend.firebasestorage.app",
  messagingSenderId: "819434211204",
  appId: "1:819434211204:web:1af38ca9ad66c285867fd1",
  measurementId: "G-PFZRZ3DSYE"
};
```

## 🆘 **Need Help?**
- **Firebase Docs**: [firebase.google.com/docs](https://firebase.google.com/docs)
- **Console**: [console.firebase.google.com](https://console.firebase.google.com)

## 🚀 **Ready to Go!**
Once you enable the services in Firebase Console, your website will have a fully functional backend!

---

**Total setup time**: ~10 minutes ⏱️  
**Cost**: FREE 💰  
**Complexity**: Very Easy 🌟
