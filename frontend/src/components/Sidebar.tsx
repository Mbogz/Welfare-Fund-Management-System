import { NavLink } from 'react-router-dom';
import { 
  Shield, 
  LayoutDashboard, 
  UserPlus, 
  Users, 
  PiggyBank, 
  TrendingUp, 
  Bot, 
  Receipt, 
  Home, 
  User 
} from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-gray-100 flex flex-col h-full shadow-xl">
      {/* Dynamic Branding Header */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold tracking-wider text-indigo-400 flex items-center gap-2">
          <Shield className="h-6 w-6 text-indigo-500" />
          <span>Truth Platform</span>
        </h1>
        <span className="text-xs text-gray-500 block mt-1">Welfare & AI Management</span>
      </div>

      {/* Navigation Menu Hub */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        
        {/* SUPER ADMIN ROUTE BLOCK */}
        <div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
            Super Admin
          </div>
          <div className="space-y-1">
            <SidebarLink to="/super-admin" icon={<LayoutDashboard />} label="Dashboard" />
            <SidebarLink to="/super-admin/groups" icon={<Users />} label="Manage Groups" />
            <SidebarLink to="/super-admin/admins" icon={<Shield />} label="System Admins" />
            <SidebarLink to="/super-admin/profile" icon={<User />} label="Profile" />
          </div>
        </div>

        {/* WELFARE GROUP ADMIN CONTROL PANEL */}
        <div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
            Group Admin
          </div>
          <div className="space-y-1">
            <SidebarLink to="/admin" icon={<LayoutDashboard />} label="Dashboard Settings" />
            <SidebarLink to="/admin/members" icon={<Users />} label="Members List" />
            <SidebarLink to="/admin/add-member" icon={<UserPlus />} label="Add Member" />
            <SidebarLink to="/admin/contributions" icon={<PiggyBank />} label="Contributions Ledger" />
            <SidebarLink to="/admin/credit-rating" icon={<TrendingUp />} label="Credit Analytics" />
          </div>
        </div>

        {/* ORDINARY MEMBER PORTAL INTERFACE */}
        <div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
            Member Portal
          </div>
          <div className="space-y-1">
            <SidebarLink to="/member/home" icon={<Home />} label="Live Overview" />
            <SidebarLink to="/member" icon={<LayoutDashboard />} label="My Dashboard" />
            <SidebarLink to="/member/payment-bot" icon={<Bot />} label="Smart Assistant" />
            <SidebarLink to="/member/transactions" icon={<Receipt />} label="My Statements" />
          </div>
        </div>

      </nav>

      {/* Footer Branding Area */}
      <div className="p-4 border-t border-gray-800 text-center text-xs text-gray-600">
        Truth Core Engine v1.1.0
      </div>
    </aside>
  );
}

// Reusable Navigation Link Component to keep styling clean and maintain active highlight states
interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

function SidebarLink({ to, icon, label }: SidebarLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
          isActive
            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
            : 'text-gray-400 hover:bg-gray-800/60 hover:text-gray-200'
        }`
      }
    >
      {/* Clone icon to dynamically apply uniform sizing styles */}
      {React.cloneElement(icon as React.ReactElement, { className: 'h-4 w-4 shrink-0' })}
      <span>{label}</span>
    </NavLink>
  );
}