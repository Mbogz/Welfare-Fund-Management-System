import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Receipt, X, ArrowUpRight } from 'lucide-react';

const Contributions = () => {
  const [selectedHistory, setSelectedHistory] = useState<any>(null);

  const members = [
    { id: 1, name: "David Kimani", totalPaid: "KES 45,000", lastDate: "Apr 10, 2026", history: [
      { date: "Apr 10, 2026", amount: "5,000", ref: "MPESA_XYZ123" },
      { date: "Mar 08, 2026", amount: "5,000", ref: "MPESA_ABC789" }
    ]},
    { id: 2, name: "Sarah Omolo", totalPaid: "KES 30,000", lastDate: "Apr 02, 2026", history: [
      { date: "Apr 02, 2026", amount: "5,000", ref: "MPESA_JKL456" }
    ]}
  ];

  return (
    <Layout role="admin">
      <div className="flex gap-6">
        <div className={selectedHistory ? "w-2/3" : "w-full"}>
          <h1 className="text-2xl font-bold mb-6">Group Contributions</h1>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Member</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Total Contribution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {members.map((m) => (
                  <tr key={m.id} onClick={() => setSelectedHistory(m)} className="cursor-pointer hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold">{m.name}</td>
                    <td className="px-6 py-4 text-blue-600 font-bold">{m.totalPaid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedHistory && (
          <div className="w-1/3 bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sticky top-8 h-fit animate-in slide-in-from-right-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold flex items-center gap-2"><Receipt size={18} /> Past Transactions</h3>
              <button onClick={() => setSelectedHistory(null)} className="text-gray-400"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              {selectedHistory.history.map((tx: any, idx: number) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-2xl flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold text-gray-400">{tx.date}</p>
                    <p className="font-bold text-gray-900">KES {tx.amount}</p>
                    <p className="text-[10px] text-gray-400 font-mono mt-1">{tx.ref}</p>
                  </div>
                  <ArrowUpRight size={16} className="text-green-500" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Contributions;