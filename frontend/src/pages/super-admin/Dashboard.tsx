import React from 'react';
import Layout from '../../components/Layout';
import { Users, Building2, UserCheck, Activity } from 'lucide-react';

const SuperAdminDashboard = () => {
  // Mock data for the visual - Wiky will connect this to Supabase later
  const stats = [
    { label: 'Total Groups', value: '12', icon: Building2, color: 'text-blue-600' },
    { label: 'Total Admins', value: '24', icon: UserCheck, color: 'text-green-600' },
    { label: 'Active Members', value: '450', icon: Users, color: 'text-purple-600' },
    { label: 'System Health', value: '98%', icon: Activity, color: 'text-orange-600' },
  ];

  return (
    <Layout role="super-admin">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">System Overview</h1>
          <p className="text-gray-500">Monitoring all welfare groups across the platform.</p>
        </header>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-gray-50 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Recent Group Activity</h2>
          <div className="space-y-4">
            {/* Sean's placeholder for the activity list */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">G</div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Group {i} added 5 new members</p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <button className="text-sm text-blue-600 hover:underline font-medium">View Group</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SuperAdminDashboard;