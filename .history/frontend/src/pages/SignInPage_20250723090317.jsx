// src/pages/SignInPage.jsx
import { SignIn } from '@clerk/clerk-react';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="shadow-lg p-8 rounded-2xl border border-black">
        <SignIn routing="path" path="/sign-in" />
      </div>
    </div>
  );
}

