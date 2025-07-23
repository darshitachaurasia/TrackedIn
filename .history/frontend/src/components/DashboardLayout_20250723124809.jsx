// src/components/DashboardLayout.jsx
import { UserButton } from "@clerk/clerk-react";
import Sidebar from "./Sidebar"; // ✅ Make sure this path is correct

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50 text-black">
      {/* Sidebar */}
        <div className="flex justify-between items-center p-6 border-b shadow bg-white">
          <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
          <UserButton afterSignOutUrl="/si" />
        </div>
      <Sidebar />

      {/* Main content */}
      
    </div>
  );
}
