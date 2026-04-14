import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { supabase } from '../../lib/supabaseclient';
import { Building2, Info, Phone, TrendingUp, Loader2, AlertCircle } from 'lucide-react';

const MemberHome = () => {
  const [groupData, setGroupData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroupInfo = async () => {
      try {
        console.log("Attempting to fetch from group_settings...");
        
        // We fetch the single row (ID 3) currently in your database
        const { data, error, status } = await supabase
          .from('group_settings')
          .select('*')
          .maybeSingle();

        if (error) {
          console.error("Supabase Error:", error.message, "Status:", status);
          setErrorStatus(`Connection Error: ${error.message}`);
        } else if (data) {
          console.log("Success! Found Row:", data);
          setGroupData(data);
        } else {
          // This matches your error message
          console.warn("Table found, but no rows returned. Check RLS settings.");
          setErrorStatus("No group settings found. Check Supabase RLS policies.");
        }
      } catch (err) {
        console.error("Critical Failure:", err);
        setErrorStatus("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchGroupInfo();
  }, []);

  if (loading) {
    return (
      <Layout role="member">
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-blue-600">
          <Loader2 className="animate-spin mb-2" size={32} />
          <p className="font-bold tracking-tight">Syncing Live Data...</p>
        </div>
      </Layout>
    );
  }

  if (errorStatus && !groupData) {
    return (
      <Layout role="member">
        <div className="max-w-md mx-auto mt-20 p-8 bg-amber-50 border border-amber-200 rounded-3xl text-center">
          <AlertCircle className="mx-auto text-amber-500 mb-4" size={48} />
          <h2 className="text-xl font-black text-amber-900 mb-2">Sync Connection Error</h2>
          <p className="text-amber-800 mb-6 text-sm font-medium">{errorStatus}</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-white border-2 border-amber-200 text-amber-900 rounded-2xl font-black hover:bg-amber-100 transition-all"
          >
            Retry Connection
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout role="member">
      <div className="max-w-5xl mx-auto space-y-8 pb-12">
        <div className="flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-3xl bg-blue-600 flex items-center justify-center text-white mb-6 shadow-xl shadow-blue-100">
            <Building2 size={40} />
          </div>
          <h1 className="text-5xl font-black text-gray-900 tracking-tight italic uppercase">
            {groupData?.group_name || "Welfare Fund"}
          </h1>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <Info size={16} /> Fund Mission
          </h3>
          <p className="text-gray-700 leading-relaxed font-medium text-xl">
            {groupData?.description || "Loading mission statement..."}
          </p>
        </div>

        <div className="p-10 rounded-[2.5rem] border border-emerald-100 bg-emerald-50/40 shadow-sm">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-800 flex items-center gap-2 mb-8">
            <Phone size={20} /> Official Payment Channel (M-Pesa)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-emerald-600/60 uppercase tracking-widest">Paybill Number</label>
              <p className="text-4xl font-mono font-black text-emerald-900 tracking-tighter">{groupData?.paybill || "--- ---"}</p>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-emerald-600/60 uppercase tracking-widest">Account Name</label>
              <p className="text-4xl font-mono font-black text-emerald-900 tracking-tighter uppercase">{groupData?.account_name || "REQUIRED"}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Target Amount', val: `KES ${groupData?.target_amount || '0'}` },
            { label: 'Contribution Frequency', val: groupData?.frequency || 'Monthly' },
            { label: 'Next Deadline', val: groupData?.deadline || 'TBD' }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-[2rem] border border-gray-100 bg-white shadow-sm">
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">{item.label}</label>
              <p className="text-lg font-black text-gray-800">{item.val}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default MemberHome;