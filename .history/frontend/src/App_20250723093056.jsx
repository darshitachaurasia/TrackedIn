import { useUser, SignedIn, SignedOut, RedirectToSignIn, UserButton } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

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
      {/* Top-right user button if logged in */}
      <SignedIn>
        <div className="flex justify-end p-4">
          <UserButton />
        </div>
      </SignedIn>

      <Routes>
        <Route
          path="/dashboard"
          element={
            <SignedIn>
              <Dashboard />
            </SignedIn>
          }
        />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />

        {/* Default route: Show sign in or redirect */}
        <Route
          path="/"
          element={
            <SignedIn>
              <Dashboard />
            </SignedIn>
          }
        />
        <Route path="*" element={<RedirectToSignIn />} />
      </Routes>
    </>
  );
}
