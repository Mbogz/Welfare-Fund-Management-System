import React from 'react';
import { LayoutDashboard, UserPlus, Users } from 'lucide-react';

interface SidebarProps {
  currentView: 'admin' | 'member' | 'add-member';
  setCurrentView: (view: 'admin' | 'member' | 'add-member') => void;
}

export default function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  return (
    <aside className="w-64 bg-gray-900 text-gray-100 flex flex-col h-full shadow-lg">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold tracking-wider text-indigo-400 flex items-center gap-2">
          <Users className="h-6 w-6" />
          <span>Truth System</span>
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        <button
          onClick={() => setCurrentView('admin')}
          className={`flex items-center space-x-3 w-full p-3 rounded-lg font-medium transition-all ${
            currentView === 'admin' 
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <LayoutDashboard className="h-5 w-5" />
          <span>Admin Dashboard</span>
        </button>

        <button
          onClick={() => setCurrentView('member')}
          className={`flex items-center space-x-3 w-full p-3 rounded-lg font-medium transition-all ${
            currentView === 'member' 
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <Users className="h-5 w-5" />
          <span>Member Home</span>
        </button>

        <button
          onClick={() => setCurrentView('add-member')}
          className={`flex items-center space-x-3 w-full p-3 rounded-lg font-medium transition-all ${
            currentView === 'add-member' 
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <UserPlus className="h-5 w-5" />
          <span>Add Member</span>
        </button>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-800 text-center text-xs text-gray-500">
        Welfare System v1.0
      </div>
    </aside>
  );
}