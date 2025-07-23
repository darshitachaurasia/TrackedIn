import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { FaHome, FaFire, FaTasks, FaRobot, FaLifeRing, FaUsers } from "react-icons/fa";

const Dash = () => {
  return (
    <nav className="h-screen flex flex-col justify-between p-4 shadow-lg border-r w-64 bg-white">
      {/* Top menu */}
      <Menubar className="flex flex-col gap-2 bg-transparent shadow-none border-none">
        <MenubarMenu>
          <MenubarTrigger className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition">
            <FaHome /> Home
          </MenubarTrigger>
          <MenubarTrigger className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition">
            <FaFire /> Streak
          </MenubarTrigger>
          <MenubarTrigger className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition">
            <FaTasks /> Task
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>

      {/* Bottom menu */}
      <div className="flex flex-col gap-2">
        <Menubar className="flex flex-col gap-2 bg-transparent shadow-none border-none">
          <MenubarMenu>
            <MenubarTrigger className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition">
              <FaRobot /> AI Agent
            </MenubarTrigger>
            <MenubarTrigger className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition">
              <FaLifeRing /> Get Help
            </MenubarTrigger>
            <MenubarTrigger className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition">
              <FaUsers /> Team
            </MenubarTrigger>
          </MenubarMenu>
        </Menubar>
      </div>
    </nav>
  );
};

export default Dash;
