import {
  LayoutDashboard,
  BarChart3,
  FolderKanban,
  Users,
  Settings,
  HelpCircle,
  Search,
} from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="h-screen w-64 bg-zinc-900 text-zinc-100 flex flex-col justify-between p-4">
      {/* Top Section */}
      <div>
        <div className="text-xl font-bold mb-8">🚀 Acme Inc.</div>

        <nav className="space-y-2">
          <SidebarItem icon={<LayoutDashboard />} label="Dashboard" />
          <SidebarItem icon={<BarChart3 />} label= />
          <SidebarItem icon={<FolderKanban />} label="Analytics" />
          <SidebarItem icon={<Users />} label="Projects" />
          <SidebarItem icon={<Users />} label="Team" />

          <div className="mt-6 border-t border-zinc-700 pt-4 space-y-2">
            <SidebarItem icon={<FolderKanban />} label="Data Library" />
            <SidebarItem icon={<BarChart3 />} label="Reports" />
            <SidebarItem icon={<Search />} label="Word Assistant" />
            <SidebarItem icon={<Users />} label="More" />
          </div>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="space-y-2 border-t border-zinc-700 pt-4">
        <SidebarItem icon={<Settings />} label="Settings" />
        <SidebarItem icon={<HelpCircle />} label="Get Help" />
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon, label }) => (
  <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-800 cursor-pointer text-sm">
    <span>{icon}</span>
    <span>{label}</span>
  </div>
);

export default Sidebar;
