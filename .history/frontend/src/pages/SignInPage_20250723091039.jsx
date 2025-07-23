// src/pages/SignInPage.jsx
import { SignIn } from '@clerk/clerk-react';

export default function SignInPage() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-white">
      <div className="shadow-lg p-6 rounded-2xl border border-gray-200 bg-white">
        <SignIn routing="path" path="/sign-in" />
      </div>
    </div>
  );
}
