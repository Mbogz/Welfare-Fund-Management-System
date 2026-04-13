import React from 'react';
import Layout from '../../components/Layout';
import { ArrowDownLeft, CheckCircle2, Clock } from 'lucide-react';

const MemberTransactions = () => {
  const transactions = [
    { id: 1, type: "Monthly Savings", amount: "5,000", date: "Mar 15, 2026", method: "M-Pesa", status: "Completed" },
    { id: 2, type: "Emergency Fund", amount: "2,000", date: "Feb 12, 2026", method: "Cash", status: "Completed" },
    { id: 3, type: "Monthly Savings", amount: "5,000", date: "Jan 10, 2026", method: "M-Pesa", status: "Completed" },
  ];

  return (
    <Layout role="member">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
          <p className="text-gray-500">A detailed log of all your contributions.</p>
        </header>

        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-green-50 p-3 rounded-xl text-green-600">
                  <ArrowDownLeft size={24} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{tx.type}</p>
                  <p className="text-xs text-gray-500">{tx.date} • {tx.method}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">KES {tx.amount}</p>
                <span className="text-[10px] font-bold uppercase tracking-widest text-green-600 flex items-center gap-1 justify-end">
                  <CheckCircle2 size={12} /> {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default MemberTransactions;