import React from 'react';
import { ClerkProvider } from '@clerk/clerk-react';
// import MainApp from './components/MainApp'; // Adjust the path if needed
import MainApp from "./MainApp";


const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error('Missing Clerk publishable key. Set VITE_CLERK_PUBLISHABLE_KEY in .env file');
}

const App = () => {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <MainApp />
    </ClerkProvider>
  );
};

export default App;
