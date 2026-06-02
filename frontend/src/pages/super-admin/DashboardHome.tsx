import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Layers, ShieldCheck, Clock, RefreshCw } from 'lucide-react';

interface ActivityLog {
  id: string;
  full_name: string;
  role: string;
  joined_at: string;
}

export default function DashboardHome() {
  const [totalGroups, setTotalGroups] = useState<number>(0);
  const [totalAdmins, setTotalAdmins] = useState<number>(0);
  const [recentActivity, setRecentActivity] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLiveDashboardData = async () => {
    setLoading(true);
    try {
      const { count: groupsCount } = await supabase.from('groups').select('*', { count: 'exact', head: true });
      const { count: adminsCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'admin');
      const { data: activityData } = await supabase
        .from('profiles')
        .select('id, full_name, role, joined_at')
        .order('joined_at', { ascending: false })
        .limit(4);

      setTotalGroups(groupsCount || 0);
      setTotalAdmins(adminsCount || 0);
      setRecentActivity(activityData || []);
    } catch (error) {
      console.error("Failed to sync:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLiveDashboardData(); }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8 mt-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-5 gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Super Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">System-wide real-time overview and group performance telemetry tracking.</p>
        </div>
        <button
          onClick={fetchLiveDashboardData}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Sync Realtime Telemetry</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Total Groups</span>
            <span className="text-4xl font-black text-gray-900 block">{loading ? "..." : totalGroups}</span>
          </div>
          <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
            <Layers className="h-6 w-6" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Total Admins</span>
            <span className="text-4xl font-black text-gray-900 block">{loading ? "..." : totalAdmins}</span>
          </div>
          <div className="p-4 bg-purple-50 text-purple-600 rounded-xl">
            <ShieldCheck className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <h3 className="text-sm font-bold text-gray-900">Recent Realtime Audits Feed</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="p-5 flex items-center justify-between hover:bg-gray-50/30">
              <div className="flex items-center space-x-4">
                <div className={`h-2.5 w-2.5 rounded-full ${activity.role === 'admin' ? 'bg-purple-500' : 'bg-green-500'}`} />
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{activity.full_name}</h4>
                  <p className="text-xs text-gray-400 mt-0.5 capitalize">{activity.role}</p>
                </div>
              </div>
              <span className="text-xs font-mono text-gray-400">
                {new Date(activity.joined_at).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}