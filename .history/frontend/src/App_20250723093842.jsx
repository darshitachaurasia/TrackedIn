import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { SignIn, SignUp, RedirectToSignIn } from '@clerk/clerk-react';

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

    if (isLoaded) {
      if (user) {
        storeUserInDB();
        navigate('/dashboard');
      }
    }
  }, [user, isLoaded, navigate]);

  return (
    <Routes>
      <Route path="/" element={<RedirectToSignIn />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
