import React from 'react';
import Layout from '../../components/Layout';
import { Users, Wallet, Phone, Info, Building2, TrendingUp } from 'lucide-react';

const MemberHome = () => {
  // These would typically come from a global state or API call
  const groupData = {
    name: "Truth",
    description: "A brief description of our welfare goals...",
    paybill: "400200",
    account: "GROUP_ACCOUNT_NAME",
    target: "5000",
    frequency: "Month",
    deadline: "2026-04-30"
  };

  return (
    <Layout role="member">
      <div className="max-w-5xl mx-auto space-y-8 pb-12">
        <div className="flex flex-col items-center text-center">
          <div className="w-36 h-36 rounded-3xl bg-blue-600 flex items-center justify-center text-white mb-6">
            <Building2 size={48} />
          </div>
          <h1 className="text-5xl font-black text-gray-900 tracking-tight italic">{groupData.name}</h1>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Info size={16} /> Group Description</h3>
          <p className="text-gray-600 leading-relaxed font-medium">{groupData.description}</p>
        </div>

        <div className="p-8 rounded-3xl border border-green-100 bg-green-50/30 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-green-800 flex items-center gap-2 mb-6">
            <Phone size={20} /> Payment Details (M-Pesa)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase">Paybill Number</label>
              <p className="text-2xl font-mono font-bold text-green-900">{groupData.paybill}</p>
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase">Account Name</label>
              <p className="text-2xl font-mono font-bold text-green-900">{groupData.account}</p>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-3xl border border-gray-100 bg-white shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 flex items-center gap-2 mb-6">
            <TrendingUp size={20} className="text-blue-600" /> Current Target
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div><label className="text-[10px] font-bold text-gray-400 uppercase">Amount</label><p className="text-xl font-bold text-gray-700">KES {groupData.target}</p></div>
            <div><label className="text-[10px] font-bold text-gray-400 uppercase">Frequency</label><p className="text-xl font-bold text-gray-700">{groupData.frequency}</p></div>
            <div><label className="text-[10px] font-bold text-gray-400 uppercase">Deadline</label><p className="text-xl font-bold text-gray-700">{groupData.deadline}</p></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MemberHome;