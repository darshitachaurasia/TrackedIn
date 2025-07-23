import { useUser, SignIn, SignUp } from '@clerk/clerk-react';
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

    if (isLoaded) {
      if (user) {
        storeUserInDB(); // 👈 Store in MongoDB
        navigate('/dashboard');
      } else {
        navigate('/sign-in');
      }
    }
  }, [user, isLoaded, navigate]);

  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/sign-in" element={<SignIn routing="path" path="/sign-in" />} />
      <Route path="/sign-up" element={<SignUp routing="path" path="/sign-up" />} />
    </Routes>
  );
}
