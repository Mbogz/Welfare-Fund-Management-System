import React from 'react';
import Layout from '../../components/Layout';
import { TrendingUp, Award, AlertCircle, Info, ChevronRight } from 'lucide-react';

const CreditRating = () => {
  // Mock data for Sean's visual layout
  const ratings = [
    { id: 1, name: "David Kimani", score: 850, tier: "Excellent", color: "text-green-600", bg: "bg-green-50" },
    { id: 2, name: "Sarah Omolo", score: 720, tier: "Good", color: "text-blue-600", bg: "bg-blue-50" },
    { id: 3, name: "Kevin Mutua", score: 450, tier: "Poor", color: "text-red-600", bg: "bg-red-50" },
  ];

  return (
    <Layout role="admin">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Member Credit Ratings</h1>
          <p className="text-gray-500">System-generated scores based on contribution consistency and history.</p>
        </header>

        {/* Rating Legend/Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Info size={20}/></div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">How it's calculated</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Scores range from 300 to 900. Factors include on-time payments, frequency of cash vs digital, and total years in group.
              </p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Member</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Credit Score</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Rating Tier</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {ratings.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{item.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp size={16} className={item.color} />
                      <span className={`font-bold text-lg ${item.color}`}>{item.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${item.bg} ${item.color}`}>
                      {item.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-gray-400 hover:text-blue-600 flex items-center gap-1 text-sm font-medium">
                      View Details <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default CreditRating;