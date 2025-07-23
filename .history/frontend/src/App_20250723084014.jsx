import { useUser, SignIn, SignUp } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';

export default function App() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded) {
      if (user) {
        // ✅ Redirect to dashboard if signed in
        navigate('/dashboard');
      } else {
        // 🔒 Redirect to Sign In page if not signed in
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
