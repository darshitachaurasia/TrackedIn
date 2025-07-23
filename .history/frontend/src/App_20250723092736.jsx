import { useUser, SignedIn, SignedOut, SignIn, SignUp, UserButton } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
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
      navigate('/dashboard');
    }
  }, [user, isLoaded, navigate]);

  return (
    <>
      <SignedOut>
        {/* Clerk's built-in SignIn & SignUp pages */}
        <Routes>
          <Route path="*" element={<SignIn routing="path" path="/sign-in" />} />
          <Route path="/sign-up" element={<SignUp routing="path" path="/sign-up" />} />
        </Routes>
      </SignedOut>

      <SignedIn>
        {/* When user is signed in */}
        <header className="flex justify-between items-center px-4 py-2 shadow">
          <h1 className="text-xl font-bold">Daily Tracker</h1>
          <UserButton />
        </header>

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </SignedIn>
    </>
  );
}
