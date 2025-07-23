// src/pages/SignInPage.jsx
import { SignIn } from '@clerk/clerk-react';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <SignIn
        path="/sign-in"
        routing="path"
        appearance={{
          elements: {
            card: "bg-white rounded-xl shadow-md p-8 w-full max-w-md",
            headerTitle: "text-2xl font-bold text-black mb-4",
            headerSubtitle: "text-sm text-gray-500 mb-6",
            formFieldLabel: "text-sm font-medium text-gray-700",
            formFieldInput:
              "w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black",
            socialButtonsBlockButton:
              "w-full py-2 px-4 mb-2 border border-gray-800 rounded-md text-black bg-white hover:bg-gray-100",
            footerActionText: "text-sm text-gray-600",
            footerActionLink: "text-black font-medium hover:underline",
          },
        }}
      />
    </div>
  );
}
