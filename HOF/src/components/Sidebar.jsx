import { useState } from "react";
import { Menu, Home, User, Settings, LogOut } from "lucide-react";

export default function Sidebar() {
  const isOpen = true;

  return (
    <div className="flex">
      <div className={`h-screen bg-gray-900 text-white p-4 transition-all ${isOpen ? "w-64" : "w-16"}`}>
        <button
          className="mb-4 flex items-center gap-2 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 w-full"
        >
          <Home size={24} />
          {isOpen && <span>Home</span>}
        </button>

        {/* Navigation */}
        <nav className="flex flex-col gap-4">
          <NavItem icon={<User />} text="Profile" isOpen={true}/>
          <NavItem icon={<Settings />} text="Settings" isOpen={true}/>
          <NavItem icon={<LogOut />} text="Logout" isOpen={true} />
        </nav>
      </div>
    </div>
  );
}

// Sidebar Item Component
function NavItem({ icon, text, isOpen }) {
  return (
    <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700 cursor-pointer">
      {icon}
      {isOpen && <span>{text}</span>}
    </div>
  );
}
