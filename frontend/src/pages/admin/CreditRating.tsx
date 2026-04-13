import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Star, X, CheckCircle2, Clock } from 'lucide-react';

const CreditRatings = () => {
  const [selectedRating, setSelectedRating] = useState<any>(null);

  const members = [
    { id: 1, name: "David Kimani", score: 720, standing: "Excellent", timeline: [
      { month: "April", onTime: true }, { month: "March", onTime: true }, { month: "February", onTime: true }
    ]},
    { id: 2, name: "Sarah Omolo", score: 580, standing: "Average", timeline: [
      { month: "April", onTime: false }, { month: "March", onTime: true }, { month: "February", onTime: false }
    ]}
  ];

  return (
    <Layout role="admin">
      <div className="flex gap-6">
        <div className={selectedRating ? "w-2/3" : "w-full"}>
          <h1 className="text-2xl font-bold mb-6">Credit Scores</h1>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-left">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr><th className="px-6 py-4">Member</th><th className="px-6 py-4">Score</th></tr>
              </thead>
              <tbody className="divide-y">
                {members.map(m => (
                  <tr key={m.id} onClick={() => setSelectedRating(m)} className="cursor-pointer hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold">{m.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${m.score > 600 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                        {m.score}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedRating && (
          <div className="w-1/3 bg-white rounded-3xl border shadow-xl p-8 sticky top-8 h-fit animate-in slide-in-from-right-4">
             <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold flex items-center gap-2"><Star size={18} className="text-yellow-500" /> Payment Reliability</h3>
              <button onClick={() => setSelectedRating(null)} className="text-gray-400"><X size={18} /></button>
            </div>
            <div className="space-y-6">
              {selectedRating.timeline.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between border-l-2 border-gray-100 pl-4 py-1">
                  <span className="font-bold text-gray-700">{item.month}</span>
                  {item.onTime ? 
                    <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 uppercase"><CheckCircle2 size={14} /> On Time</span> :
                    <span className="flex items-center gap-1 text-[10px] font-bold text-orange-500 uppercase"><Clock size={14} /> Delayed</span>
                  }
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CreditRatings;