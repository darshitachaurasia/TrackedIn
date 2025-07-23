// src/components/DashboardLayout.jsx
import Dash from "@/pages/Dash";

import { UserButton } from "@clerk/clerk-react";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50 text-black justify-end">
      {/* Sidebar */}
      

      {/* Main content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
          <UserButton afterSignOutUrl="/si" />
        </div>
         <Dash />

        {children}
      </div>
    </div>
  );
}
