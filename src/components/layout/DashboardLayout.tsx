import { useState } from "react";
import { Outlet } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-customWhite flex">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col min-w-0 md:ml-64 transition-all duration-300">
        
        <header className="md:hidden bg-customWhite h-16 shadow-sm flex items-center px-4 sticky top-0 z-30">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="text-primary p-2 rounded-lg hover:bg-gray-100"
          >
            <HiMenu size={24} />
          </button>
          <span className="font-bold text-lg text-primary ml-4">Dashboard</span>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;