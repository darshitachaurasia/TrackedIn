
import React from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { Zap, Target, TrendingUp, Share2 } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">TI</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">TrackedIn</span>
          </div>

          {/* Auth Buttons */}
          <div className="space-x-4 flex items-center">
            {/* Show when user is signed out */}
            <SignedOut>
              <SignInButton
                mode="modal"
                redirectUrl="/dashboard"
                className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                Sign In
              </SignInButton>

              <SignUpButton
                mode="modal"
                redirectUrl="/dashboard"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </SignUpButton>
            </SignedOut>

            {/* Show when user is signed in */}
            <SignedIn>
              <a
                href="/dashboard"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Go to Dashboard
              </a>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Build Habits. Track Progress. Share Growth.
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A modern, AI-powered productivity tracker to help you stay
            consistent, motivated, and showcase your daily wins with ease.
          </p>

          {/* Show CTA only if user not signed in */}
          <SignedOut>
            <SignUpButton
              mode="modal"
              redirectUrl="/dashboard"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105"
            >
              Start your Journey
            </SignUpButton>
          </SignedOut>

          {/* If already signed in, just show go to dashboard */}
          <SignedIn>
            <a
              href="/dashboard"
              className="px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-xl hover:bg-green-700 transition-all transform hover:scale-105"
            >
              Go to Dashboard
            </a>
          </SignedIn>
        </div>

        {/* Features */}
        <div className="max-w-6xl mx-auto mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Target className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Daily Goals</h3>
            <p className="text-gray-600">
              Set and track your daily objectives with ease
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Zap className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Streak Tracking</h3>
            <p className="text-gray-600">
              Build momentum with daily streak counters
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <TrendingUp className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Progress Analytics</h3>
            <p className="text-gray-600">Visualize your growth over time</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Share2 className="w-12 h-12 text-orange-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI-Generated Posts</h3>
            <p className="text-gray-600">
              Share your progress on LinkedIn automatically
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
