import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  FaTachometerAlt,
  FaHome,
  FaFire,
  FaTasks,
  FaRobot,
  FaLifeRing,
  FaUsers,
} from "react-icons/fa";

import { UserButton } from "@clerk/clerk-react";

const Dash = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <nav className="w-64 p-6 bg-white shadow-md border-r flex flex-col justify-between">
        {/* Top Section */}
        <div className="space-y-6">
          <div className="text-2xl font-bold flex items-center gap-2">
            <FaTachometerAlt className="text-blue-600" />
            Dashboard
          </div>

          <Menubar className="flex flex-col gap-2 bg-transparent shadow-none border-none">
            <MenubarMenu>
              <MenubarTrigger className="flex items-center gap-3 text-lg p-2 rounded-md hover:bg-gray-100 transition">
                <FaHome className="text-gray-600" />
                Home
              </MenubarTrigger>
              <MenubarTrigger className="flex items-center gap-3 text-lg p-2 rounded-md hover:bg-gray-100 transition">
                <FaFire className="text-gray-600" />
                Streak
              </MenubarTrigger>
              <MenubarTrigger className="flex items-center gap-3 text-lg p-2 rounded-md hover:bg-gray-100 transition">
                <FaTasks className="text-gray-600" />
                Task
              </MenubarTrigger>
            </MenubarMenu>
          </Menubar>
        </div>

        {/* Bottom Section */}
        <div className="space-y-4">
          <Menubar className="flex flex-col gap-2 bg-transparent shadow-none border-none">
            <MenubarMenu>
              <MenubarTrigger className="flex items-center gap-3 text-lg p-2 rounded-md hover:bg-gray-100 transition">
                <FaRobot className="text-gray-600" />
                AI Agent
              </MenubarTrigger>
              <MenubarTrigger className="flex items-center gap-3 text-lg p-2 rounded-md hover:bg-gray-100 transition">
                <FaLifeRing className="text-gray-600" />
                Get Help
              </MenubarTrigger>
              <MenubarTrigger className="flex items-center gap-3 text-lg p-2 rounded-md hover:bg-gray-100 transition">
                <FaUsers className="text-gray-600" />
                Team
              </MenubarTrigger>
            </MenubarMenu>
          </Menubar>

          {/* User Button at the very bottom */}
          <div className="pt-4 border-t">
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Dashboard</h1>
          <p className="text-gray-600 text-lg">This is your main dashboard area. Add content here.</p>
        </div>
      </main>
    </div>
  );
};

export default Dash;
