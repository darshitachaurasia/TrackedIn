// src/pages/SignInPage.jsx
import { SignIn } from '@clerk/clerk-react';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="shado">
        <SignIn routing="path" path="/sign-in" />
      </div>
    </div>
  );
}

