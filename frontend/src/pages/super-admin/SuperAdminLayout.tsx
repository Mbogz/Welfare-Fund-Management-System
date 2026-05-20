import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, ShieldAlert, User } from 'lucide-react';

export default function SuperAdminLayout() {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col">
      {/* Your original polished white sub-navigation menu top header layout */}
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Main Logo Branding Branding */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-black tracking-wider text-gray-900 uppercase">
              Truth<span className="text-indigo-600">SaaS</span>
            </span>
            <span className="text-[10px] bg-red-50 text-red-700 font-bold px-2 py-0.5 rounded border border-red-100">
              Root Cluster
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="flex space-x-1">
            <NavTab to="/super-admin" icon={<LayoutDashboard />} label="Dashboard" end />
            <NavTab to="/super-admin/groups" icon={<Users />} label="Groups Info" />
            <NavTab to="/super-admin/admins" icon={<ShieldAlert />} label="Admins List" />
            <NavTab to="/super-admin/profile" icon={<User />} label="Profile" />
          </nav>

        </div>
      </header>

      {/* This renders the actual page contents (Dashboard, AdminsList, etc.) below the nav */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}

// Reusable tab helper component to handle original matching active styling state switches cleanly
function NavTab({ to, icon, label, end = false }: { to: string; icon: React.ReactNode; label: string; end?: boolean }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
          isActive
            ? 'bg-gray-900 text-white shadow-sm'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`
      }
    >
      {React.cloneElement(icon as React.ReactElement, { className: 'h-4 w-4' })}
      <span>{label}</span>
    </NavLink>
  );
}