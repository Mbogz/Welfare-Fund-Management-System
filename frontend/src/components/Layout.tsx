import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  UserCircle, 
  ShieldCheck,
  LogOut 
} from 'lucide-react';

const Layout = ({ children, role }: { children: React.ReactNode, role: 'super-admin' | 'admin' | 'member' }) => {
  const location = useLocation();

  // Helper to check if the current link is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Fixed to the left */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col fixed h-full shadow-sm z-10">
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <ShieldCheck className="text-white" size={20} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">WelfareFund</h2>
        </div>
        
        <nav className="space-y-1.5 flex-1">
          {/* General Dashboard Link */}
          <Link 
            to={role === 'super-admin' ? '/super-admin' : role === 'admin' ? '/admin' : '/member'} 
            className={`flex items-center gap-3 w-full p-3 rounded-xl font-medium transition-all duration-200 ${
              isActive('/super-admin') || isActive('/admin') || isActive('/member') 
              ? 'bg-blue-50 text-blue-700 shadow-sm' 
              : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
            }`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          
          {/* Super Admin Specific Navigation */}
          {role === 'super-admin' && (
            <>
              <Link 
                to="/super-admin/groups" 
                className={`flex items-center gap-3 w-full p-3 rounded-xl font-medium transition-all duration-200 ${
                  isActive('/super-admin/groups') ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                }`}
              >
                <Building2 size={20} /> Groups Info
              </Link>
              
              <Link 
                to="/super-admin/admins" 
                className={`flex items-center gap-3 w-full p-3 rounded-xl font-medium transition-all duration-200 ${
                  isActive('/super-admin/admins') ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                }`}
              >
                <Users size={20} /> Admins List
              </Link>
            </>
          )}

          {/* Admin and Member links will be injected here in future steps */}
        </nav>

        {/* Bottom Section: Profile & Logout */}
        <div className="border-t border-gray-100 pt-4 space-y-1">
          <Link 
            to={role === 'super-admin' ? '/super-admin/profile' : '/profile'}
            className={`flex items-center gap-3 w-full p-3 rounded-xl font-medium transition-all duration-200 ${
              isActive('/super-admin/profile') ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <UserCircle size={20} /> Profile
          </Link>
          <button className="flex items-center gap-3 w-full p-3 text-red-500 hover:bg-red-50 rounded-xl font-medium transition-all duration-200">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area - Shifted 64 units (w-64) to the right */}
      <main className="flex-1 ml-64 p-8 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;