import {
  FaHome,
  FaFire,
  FaTasks,
  FaRobot,
  FaLifeRing,
  FaUsers,
} from "react-icons/fa";

const Dash = () => {
  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r shadow-sm">
        <div className="flex h-16 items-center justify-center border-b">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>

        <nav className="flex flex-col gap-2 p-4 text-sm">
          <a
            href="#"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
          >
            <FaHome className="text-gray-500" />
            Home
          </a>
          <a
            href="#"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
          >
            <FaFire className="text-gray-500" />
            Streak
          </a>
          <a
            href="#"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
          >
            <FaTasks className="text-gray-500" />
            Task
          </a>

          <div className="border-t my-2"></div>

          <a
            href="#"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
          >
            <FaRobot className="text-gray-500" />
            AI Agent
          </a>
          <a
            href="#"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
          >
            <FaLifeRing className="text-gray-500" />
            Get Help
          </a>
          <a
            href="#"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
          >
            <FaUsers className="text-gray-500" />
            Team
          </a>
        </nav>
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-6 bg-gray-50">
        <div className="text-3xl font-semibold text-gray-800">
          Welcome to Dashboard
        </div>
      </main>
    </div>
  );
};

export default Dash;

export default Dash;
