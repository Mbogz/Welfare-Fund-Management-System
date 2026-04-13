import React from 'react';
import Layout from '../../components/Layout';
import { Wallet, ArrowUpCircle, Clock, Star } from 'lucide-react';

const MemberDashboard = () => {
  return (
    <Layout role="member">
      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <h1 className="text-2xl font-bold text-gray-900">My Finances</h1>
          <p className="text-gray-500">Overview of your contributions and standing in Nairobi Tech Savings Group.</p>
        </header>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-xl shadow-blue-100">
            <div className="flex justify-between items-start mb-4">
              <Wallet size={24} className="opacity-80" />
              <span className="text-xs font-bold uppercase tracking-widest opacity-60">Total Savings</span>
            </div>
            <p className="text-3xl font-bold">KES 45,000.00</p>
            <div className="mt-6 flex items-center gap-2 text-sm text-blue-100 bg-white/10 w-fit px-3 py-1 rounded-full">
              <ArrowUpCircle size={16} /> +KES 5,000 this month
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <Star size={24} className="text-yellow-500" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Credit Score</span>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">720</p>
              <p className="text-sm font-medium text-green-600 mt-1">Tier: Good Standing</p>
            </div>
          </div>
        </div>

        {/* Upcoming Obligations */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Clock size={18} className="text-orange-500" /> Pending Contributions
          </h2>
          <div className="flex justify-between items-center p-4 bg-orange-50 rounded-xl border border-orange-100">
            <div>
              <p className="font-bold text-orange-900">Monthly Contribution</p>
              <p className="text-sm text-orange-700">Due by April 30, 2026</p>
            </div>
            <p className="text-lg font-bold text-orange-900 font-mono">KES 5,000</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MemberDashboard;