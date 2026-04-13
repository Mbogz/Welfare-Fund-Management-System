import React from 'react';
import Layout from '../../components/Layout';
import { Users, Building2, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';

const SuperAdminDashboard = () => {
  // Stats for the top row
  const stats = [
    { label: "Total Groups", value: "12", icon: Building2, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Admins", value: "14", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Total Revenue", value: "KES 1.2M", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
  ];

  const recentActivity = [
    { id: 1, group: "Nairobi Tech Savings", action: "New Admin Assigned", time: "2 hours ago", status: "Completed" },
    { id: 2, group: "Mombasa Traders Welfare", action: "Group Registered", time: "5 hours ago", status: "Completed" },
    { id: 3, group: "Kisumu Fishers Hub", action: "Admin Invitation Sent", time: "1 day ago", status: "Pending" },
  ];

  return (
    <Layout role="super-admin">
      <div className="space-y-8">
        <header>
          <h1 className="text-2xl font-bold text-gray-900">Super Admin Dashboard</h1>
          <p className="text-gray-500">System-wide overview and group performance tracking.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon size={24} />
              </div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <Clock size={18} className="text-blue-600" /> Recent Activity
            </h2>
          </div>
          
          <div className="divide-y divide-gray-50">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${activity.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{activity.group}</p>
                    <p className="text-xs text-gray-500">{activity.action}</p>
                  </div>
                </div>
                
                {/* Removed the Button - Now just showing the timestamp */}
                <div className="text-right">
                  <p className="text-xs font-medium text-gray-400">{activity.time}</p>
                  <span className={`text-[10px] font-bold uppercase tracking-widest mt-1 block ${
                    activity.status === 'Completed' ? 'text-green-500' : 'text-orange-500'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SuperAdminDashboard;