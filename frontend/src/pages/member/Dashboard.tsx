import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseclient';
import { Loader2, Wallet, Star } from 'lucide-react';
import Layout from '../../components/Layout';

const MemberDashboard = () => {
  const [data, setData] = useState<any>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: settings } = await supabase.from('group_settings').select('*').maybeSingle();
      const { data: totalData } = await supabase.rpc('get_total_group_contributions');
      
      setData(settings);
      setTotal(totalData || 0);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto" /></div>;

  return (
    <Layout role="member">
      <div className="max-w-4xl mx-auto space-y-6 p-6">
        {/* Logo and Group Title */}
        <div className="flex flex-col items-center mb-8">
          {data?.logo_url && (
            <div className="w-32 h-32 mb-4 rounded-3xl overflow-hidden shadow-lg border-4 border-white">
              <img src={data.logo_url} alt="Group Logo" className="w-full h-full object-cover" />
            </div>
          )}
          <h1 className="text-3xl font-black text-gray-900">{data?.group_name || "Member Dashboard"}</h1>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-600 p-8 rounded-3xl text-white shadow-xl">
            <Wallet size={24} className="opacity-80 mb-4" />
            <p className="text-xs uppercase opacity-60">Total Group Savings</p>
            <p className="text-3xl font-bold">KES {total.toLocaleString()}</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <Star size={24} className="text-yellow-500 mb-4" />
            <p className="text-xs uppercase text-gray-400">Target Amount</p>
            <p className="text-3xl font-bold text-gray-900">KES {data?.target_amount?.toLocaleString() || "0"}</p>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">About the Group</h2>
          <p className="text-gray-600 leading-relaxed">{data?.description}</p>
        </div>
      </div>
    </Layout>
  );
};

export default MemberDashboard;