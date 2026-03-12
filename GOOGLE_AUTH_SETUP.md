# Firebase Setup Guide (Authentication + Firestore Database)

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or select an existing one
3. Enable Authentication:
   - Go to "Authentication" in the left sidebar
   - Click "Get started"
   - Go to "Sign-in method" tab
   - Enable "Google" as a sign-in provider
   - Add your domain to authorized domains (for production)
4. Enable Firestore Database:
   - Go to "Firestore Database" in the left sidebar
   - Click "Create database"
   - Choose "Start in test mode" (for development) or configure security rules for production
   - Select a location for your database

## Step 2: Get Firebase Configuration

1. Go to "Project settings" (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" > "Web app" (</>)
4. Register your app with a nickname
5. Copy the Firebase configuration object

## Step 3: Set Environment Variables

Update your `.env.local` file with the Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

## Step 4: Configure Authorized Domains (Production)

In Firebase Console > Authentication > Settings > Authorized domains:

- Add your production domain
- For development: `localhost`

## Step 5: Firestore Security Rules (Production)

In Firebase Console > Firestore Database > Rules, update the security rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to authenticated users
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Features Included

- ✅ **Google OAuth login** with Firebase Authentication
- ✅ **Email verification** (optional)
- ✅ **Session management** with Firebase Auth state
- ✅ **Protected routes** (dashboard requires authentication)
- ✅ **Logout functionality**
- ✅ **User profile data** stored in localStorage
- ✅ **Firestore database** for storing signals and submissions
- ✅ **Real-time data** with Firestore listeners (if needed)

## Database Collections

The app uses the following Firestore collections:

- `signals`: Stores signal data (transcription, summary, duration, status)
- `submissions`: Stores submission records linked to signals

## How It Works

1. **User clicks "Continue with Google"** → Opens Firebase Google OAuth popup
2. **User selects Google account** → Firebase handles authentication
3. **User data stored** → Profile info saved to localStorage
4. **Auto redirect to dashboard** → User is logged in and redirected
5. **Session persistence** → User stays logged in across browser sessions
6. **Database operations** → API routes use Firestore for data storage

## Troubleshooting

- **"Auth domain not authorized"**: Add your domain to Firebase authorized domains
- **"Invalid API key"**: Check your Firebase config values
- **"Popup blocked"**: Ensure popups are allowed in browser
- **Login not working**: Check browser console for Firebase errors
- **Database errors**: Check Firestore security rules and ensure user is authenticated
