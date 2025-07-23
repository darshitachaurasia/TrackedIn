import { SignUp } from '@clerk/clerk-react';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="shadow-lg p-8 rounded-2xl border border-black">
        <SignUp routing="path" path="/sign-up" />
      </div>
    </div>
  );
}
