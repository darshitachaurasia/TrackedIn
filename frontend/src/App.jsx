import React, { useEffect } from 'react';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  useUser,
  UserButton,
  RedirectToSignIn,
} from '@clerk/clerk-react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Landing from './components/Landing';
import DashboardLayout from './components/DashboardLayout';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_demo';

const App = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const storeUserInDB = async () => {
      if (user) {
        try {
          await fetch('http://localhost:3000/api/auth/me', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
              name: user.fullName,
              email: user.primaryEmailAddress?.emailAddress,
              image: user.imageUrl,
              clerkId: user.id,
            }),
          });
        } catch (error) {
          console.error('Error saving user to DB:', error);
        }
      }
    };

    if (isLoaded && user) {
      storeUserInDB();
    }
  }, [user, isLoaded]);

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-black">
          <Routes>
            {/* Landing Page */}
            <Route
              path="/"
              element={
                <>
                  <SignedOut>
                    <Landing />
                  </SignedOut>
                  <SignedIn>
                    <Navigate to="/dashboard" replace />
                  </SignedIn>
                </>
              }
            />

            {/* Dashboard (Simple) */}
            <Route
              path="/dashboard"
              element={
                <SignedIn>
                  <Dashboard />
                </SignedIn>
              }
            />

            {/* Sign In */}
            <Route
              path="/sign-in"
              element={
                <div className="flex items-center justify-center min-h-screen bg-white text-black">
                  <SignIn path="/sign-in" routing="path" />
                </div>
              }
            />

            {/* Sign Up */}
            <Route
              path="/sign-up"
              element={
                <div className="flex items-center justify-center min-h-screen bg-white text-black">
                  <SignUp path="/sign-up" routing="path" />
                </div>
              }
            />

            {/* Dashboard Layout */}
            <Route
              path="/dash"
              element={
                <SignedIn>
                  <DashboardLayout>
                    <p className="text-lg">This is your main dashboard area. Add content here.</p>
                  </DashboardLayout>
                </SignedIn>
              }
            />

            {/* Fallback Route */}
            <Route
              path="*"
              element={
                isLoaded ? (
                  user ? (
                    <Navigate to="/dash" />
                  ) : (
                    <RedirectToSignIn />
                  )
                ) : null
              }
            />
          </Routes>
        </div>
      </Router>
    </ClerkProvider>
  );
};

export default App;
