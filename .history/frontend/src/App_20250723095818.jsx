import {
  useUser,
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
  UserButton,
  RedirectToSignIn,
} from '@clerk/clerk-react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Dashboard from './Dashboard';

export default function App() {
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
    <Routes>
      {/* Sign In */}
      <Route
        path="/si"
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

      {/* Dashboard - Protected Route */}
      <Route
        path="/dashboard"
        element={
          <SignedIn>
            <div className="p-4 w-full min-h-screen bg-white text-black">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
                <UserButton afterSignOutUrl="/sign-in" />
              </div>
              <Dashboard />
            </div>
          </SignedIn>
        }
      />

      {/* Default Fallback */}
      <Route
        path="*"
        element={
          isLoaded ? (
            user ? (
              <Navigate to="/dashboard" />
            ) : (
              <RedirectToSignIn />
            )
          ) : null
        }
      />
    </Routes>
  );
}
