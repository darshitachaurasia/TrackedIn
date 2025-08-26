import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-white">
      <div className="shadow-lg p-6 rounded-2xl border border-gray-200 bg-white">
        <SignUp
          routing="path"
          path="/sign-up"
          afterSignUpUrl="/dashboard"
          afterSignInUrl="/dashboard"
        />
      </div>
    </div>
  );
}

