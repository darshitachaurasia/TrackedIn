import { useUser, SignIn, SignUp, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
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
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <Routes>
        {/* Public Routes */}
        <Route path="/sign-in" element={
          <div className="flex items-center justify-center w-full h-screen">
            <SignIn path="/sign-in" routing="path" />
          </div>
        } />
        <Route path="/sign-up" element={
          <div className="flex items-center justify-center w-full h-screen">
            <SignUp path="/sign-up" routing="path" />
          </div>
        } />

        {/* Protected Dashboard Route */}
        <Route path="/dashboard" element={
          <SignedIn>
            <div className="p-4 w-full">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
                <UserButton afterSignOutUrl="/sign-in" />
              </div>
              <Dashboard />
            </div>
          </SignedIn>
        } />

        {/* Default Route */}
        <Route path="*" element={
          <SignedOut>
            {/* Redirect to SignIn page */}
            <SignIn path="/sign-in" routing="path" />
          </SignedOut>
        } />
      </Routes>
    </div>
  );
}
