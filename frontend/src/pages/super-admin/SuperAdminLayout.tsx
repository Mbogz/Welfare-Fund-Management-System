import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, ShieldAlert, User } from 'lucide-react';

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col">
      <header className="w-full bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-black text-lg">TRUTH<span className="text-indigo-600">SAAS</span></span>
          <nav className="flex space-x-1">
            <NavLink to="/super-admin" end className={({isActive}) => `px-4 py-2 rounded-lg ${isActive ? 'bg-gray-900 text-white' : 'text-gray-600'}`}>Dashboard</NavLink>
            <NavLink to="/super-admin/admins" className={({isActive}) => `px-4 py-2 rounded-lg ${isActive ? 'bg-gray-900 text-white' : 'text-gray-600'}`}>Admins</NavLink>
            <NavLink to="/super-admin/groups" className={({isActive}) => `px-4 py-2 rounded-lg ${isActive ? 'bg-gray-900 text-white' : 'text-gray-600'}`}>Groups</NavLink>
            <NavLink to="/super-admin/profile" className={({isActive}) => `px-4 py-2 rounded-lg ${isActive ? 'bg-gray-900 text-white' : 'text-gray-600'}`}>Profile</NavLink>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-7xl w-full mx-auto p-8">{children}</main>
    </div>
  );
}