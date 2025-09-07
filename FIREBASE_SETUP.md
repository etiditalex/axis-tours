# Firebase Setup Guide for Axis Tours and Travel

## Step 1: Get Your Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: `axis-tours-backend`
3. Click the gear icon ⚙️ → Project Settings
4. Scroll to "Your apps" section
5. Click the web app icon `</>`
6. Copy the `firebaseConfig` object

## Step 2: Update js/firebase-integration.js

Replace the placeholder config in `js/firebase-integration.js` with your actual config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "axis-tours-backend.firebaseapp.com",
  projectId: "axis-tours-backend",
  storageBucket: "axis-tours-backend.appspot.com",
  messagingSenderId: "YOUR_ACTUAL_SENDER_ID",
  appId: "YOUR_ACTUAL_APP_ID"
};
```

## Step 3: Enable Authentication

1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" authentication
5. Save changes

## Step 4: Set Up Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (we have security rules)
4. Select a location (choose closest to your users)
5. Click "Done"

## Step 5: Deploy Security Rules

The security rules are already configured in `firestore.rules` and will be deployed automatically.

## Step 6: Test the System

1. Visit your website: https://axistoursandtravel.co.ke
2. Go to login page: https://axistoursandtravel.co.ke/login.html
3. Register a new account
4. Try making a booking
5. Check admin dashboard: https://axistoursandtravel.co.ke/admin-dashboard.html

## Step 7: Populate Sample Data

1. Go to admin dashboard
2. Click "Populate Sample Data" button
3. This will add sample hotels, tours, safaris, etc.

## Troubleshooting

### If you get "Firebase not initialized" errors:
- Check that your Firebase config is correct
- Make sure Authentication is enabled
- Verify Firestore database is created

### If bookings don't save:
- Check Firestore security rules
- Verify user is authenticated
- Check browser console for errors

### If admin dashboard doesn't work:
- Make sure you're logged in
- Check that Firestore has data
- Verify security rules allow admin access

## Next Steps

1. **Add Real Services**: Replace sample data with your actual hotels, tours, etc.
2. **Configure Payments**: Add Stripe or other payment gateway
3. **Set Up Email**: Configure email notifications for bookings
4. **Customize Branding**: Update colors, logos, and content
5. **SEO Optimization**: Add meta tags and structured data

## Support

If you need help with any step, check:
- Firebase Console for errors
- Browser console for JavaScript errors
- Network tab for API call failures