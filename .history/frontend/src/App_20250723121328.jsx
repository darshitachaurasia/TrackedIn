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
import DashboardLayout from './components/DashboardLayout';

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

      {/* Dashboard Layout (Protected Route) */}
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

      {/* Fallback route */}
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
  );
}
