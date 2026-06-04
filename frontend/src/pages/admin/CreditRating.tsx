import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseclient';

const CreditRatings = () => {
  const [ratings, setRatings] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('credit_ratings').select('*');
      setRatings(data || []);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Credit Scores</h1>
      <table className="w-full bg-white rounded-xl shadow-sm">
        <tbody>
          {ratings.map(m => (
            <tr key={m.id} className="border-b">
              <td className="px-6 py-4 font-bold">{m.member_name}</td>
              <td className="px-6 py-4">{m.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default CreditRatings;