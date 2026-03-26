import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Receipt, Plus, Search, Banknote, CreditCard, Check } from 'lucide-react';

const AdminContributions = () => {
  const [showCashModal, setShowCashModal] = useState(false);

  const contributions = [
    { id: 1, member: "David Kimani", amount: "5,000", date: "2026-03-20", method: "M-Pesa", status: "Verified" },
    { id: 2, member: "Sarah Omolo", amount: "5,000", date: "2026-03-21", method: "Cash", status: "Manual Entry" },
    { id: 3, member: "Kevin Mutua", amount: "2,500", date: "2026-03-22", method: "M-Pesa", status: "Verified" },
  ];

  return (
    <Layout role="admin">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Group Contributions</h1>
            <p className="text-gray-500">Track and record payments for all members.</p>
          </div>
          <button 
            onClick={() => setShowCashModal(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-100"
          >
            <Plus size={20} /> Record Cash Payment
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Member</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Amount (KES)</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Method</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {contributions.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{item.member}</td>
                  <td className="px-6 py-4 text-gray-900 font-bold">{item.amount}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="flex items-center gap-1.5 text-gray-600">
                      {item.method === 'Cash' ? <Banknote size={16} className="text-green-600"/> : <CreditCard size={16} className="text-blue-600"/>}
                      {item.method}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-tighter flex items-center gap-1">
                      <Check size={14} /> {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showCashModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl p-8">
              <h2 className="text-xl font-bold mb-4">Manual Cash Entry</h2>
              <div className="space-y-4">
                <input type="text" placeholder="Member Name" className="w-full p-3 border border-gray-200 rounded-xl" />
                <input type="number" placeholder="Amount" className="w-full p-3 border border-gray-200 rounded-xl" />
                <div className="flex gap-2">
                  <button onClick={() => setShowCashModal(false)} className="flex-1 py-3 text-gray-500 font-semibold">Cancel</button>
                  <button className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold">Save</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminContributions;