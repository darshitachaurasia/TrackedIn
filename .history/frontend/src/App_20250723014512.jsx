import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';

export default function App() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      // Call the backend route to store user
      fetch('http://localhost:3000/api/auth/me', {
        method: 'GET',
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('User stored or fetched from backend:', data);
        })
        .catch((err) => {
          console.error('Error storing user:', err);
        });
    }
  }, [user]);

  return (
    <div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}


