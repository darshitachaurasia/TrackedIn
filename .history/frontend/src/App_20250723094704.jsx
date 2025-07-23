import {
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  RedirectToSignIn,
  UserButton,
  useUser,
} from '@clerk/clerk-react';

import { Routes, Route, useNavigate } from 'react-router-dom';
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
      <Route
        path="/"
        element={
          <SignedIn>
            <Dashboard />
          </SignedIn>
        }
      />
      <Route
        path="/sign-in/*"
        element={
          <div className="flex items-center justify-center min-h-screen bg-white">
            <SignIn appearance={{
              elements: {
                card: "shadow-md border border-black",
              },
            }} />
          </div>
        }
      />
      <Route
        path="/sign-up/*"
        element={
          <div className="flex items-center justify-center min-h-screen bg-white">
            <SignUp appearance={{
              elements: {
                card: "shadow-md border border-black",
              },
            }} />
          </div>
        }
      />
      <Route
        path="/dashboard"
        element={
          <SignedIn>
            <Dashboard />
          </SignedIn>
        }
      />
      <Route path="*" element={<RedirectToSignIn />} />
    </Routes>
  );
}
