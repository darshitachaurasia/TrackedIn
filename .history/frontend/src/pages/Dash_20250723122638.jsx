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

const Dash = () => {
  return (
    <nav className="h-screen w-64 p-6 bg-white shadow-md border-r flex flex-col justify-between">
      {/* Top Section */}
      <div className="space-y-6">
        <div className="flex items-center just">
         
          Dashboard
        </div>

        <Menubar className="flex flex-col justify-end bg-transparent shadow-none border-none">
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
      <div className="space-y-2">
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
      </div>
    </nav>
  );
};

export default Dash;
