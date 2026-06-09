import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseclient';

export default function CreditRating() {
  const [ratings, setRatings] = useState<any[]>([]);

  useEffect(() => {
    const calculateRatings = async () => {
      // 1. Get all members
      const { data: members } = await supabase.from('profiles').select('id, full_name').eq('role', 'member');
      // 2. Get all transactions
      const { data: contribs } = await supabase.from('transactions').select('member_name, amount');
      
      const processed = members?.map(member => {
        const memberContribs = contribs?.filter(c => c.member_name === member.full_name);
        const totalPaid = memberContribs?.reduce((acc, curr) => acc + curr.amount, 0) || 0;
        
        // Simple logic: Score is based on total paid vs a hypothetical target
        const score = totalPaid > 10000 ? "Excellent" : totalPaid > 5000 ? "Good" : "Fair";
        return { ...member, totalPaid, score };
      });
      setRatings(processed || []);
    };
    calculateRatings();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Member Credit Scores</h2>
      <div className="bg-white rounded-xl shadow-sm border">
        {ratings.map(r => (
          <div key={r.id} className="p-4 border-b flex justify-between">
            <span>{r.full_name}</span>
            <span className={`font-bold ${r.score === 'Excellent' ? 'text-green-600' : 'text-orange-600'}`}>
              {r.score} (KES {r.totalPaid.toLocaleString()})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}