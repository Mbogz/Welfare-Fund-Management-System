import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  UserPlus, 
  Receipt, 
  TrendingUp, 
  UserCircle, 
  ShieldCheck,
  LogOut,
  Bot
} from 'lucide-react';

const Layout = ({ children, role }: { children: React.ReactNode, role: 'super-admin' | 'admin' | 'member' }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col fixed h-full shadow-sm z-10">
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <ShieldCheck className="text-white" size={20} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">WelfareFund</h2>
        </div>
        
        <nav className="space-y-1.5 flex-1">
          <Link 
            to={role === 'super-admin' ? '/super-admin' : role === 'admin' ? '/admin' : '/member'} 
            className={`flex items-center gap-3 w-full p-3 rounded-xl font-medium transition-all ${
              isActive('/super-admin') || isActive('/admin') || isActive('/member') 
              ? 'bg-blue-50 text-blue-700 shadow-sm' 
              : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          
          {role === 'super-admin' && (
            <>
              <Link to="/super-admin/groups" className={`flex items-center gap-3 w-full p-3 rounded-xl font-medium ${isActive('/super-admin/groups') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Building2 size={20} /> Groups Info
              </Link>
              <Link to="/super-admin/admins" className={`flex items-center gap-3 w-full p-3 rounded-xl font-medium ${isActive('/super-admin/admins') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Users size={20} /> Admins List
              </Link>
            </>
          )}

          {role === 'admin' && (
            <>
              <Link to="/admin/members" className={`flex items-center gap-3 w-full p-3 rounded-xl font-medium ${isActive('/admin/members') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Users size={20} /> Members List
              </Link>
              <Link to="/admin/add-member" className={`flex items-center gap-3 w-full p-3 rounded-xl font-medium ${isActive('/admin/add-member') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                <UserPlus size={20} /> Add Member
              </Link>
              <Link to="/admin/contributions" className={`flex items-center gap-3 w-full p-3 rounded-xl font-medium ${isActive('/admin/contributions') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Receipt size={20} /> Contributions
              </Link>
              <Link to="/admin/credit-rating" className={`flex items-center gap-3 w-full p-3 rounded-xl font-medium ${isActive('/admin/credit-rating') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                <TrendingUp size={20} /> Credit Ratings
              </Link>
            </>
          )}
        </nav>

        <div className="border-t border-gray-100 pt-4">
          {/* Only show Profile link for Super Admin now */}
          {role === 'super-admin' && (
            <Link to="/super-admin/profile" className={`flex items-center gap-3 w-full p-3 rounded-xl font-medium ${isActive('/super-admin/profile') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
              <UserCircle size={20} /> Profile
            </Link>
          )}
          
          <button className="flex items-center gap-3 w-full p-3 text-red-500 hover:bg-red-50 rounded-xl font-medium mt-1">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;