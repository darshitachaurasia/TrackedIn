import { UserButton } from "@clerk/clerk-react";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        {/* Navbar / Header */}
        <div className="flex justify-between items-center p-6 border-b shadow bg-white">
          <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
          <UserButton afterSignOutUrl="/si" />
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto"><Dashboard/></main>
      </div>
    </div>
  );
}
