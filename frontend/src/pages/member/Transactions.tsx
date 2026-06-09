import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseclient';
import { ArrowDownLeft, CheckCircle2, Loader2 } from 'lucide-react';
import Layout from '../../components/Layout';

const MemberTransactions = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      // 1. Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // 2. Fetch only this user's contributions
        const { data, error } = await supabase
          .from('contributions')
          .select('*')
          .eq('user_id', user.id) // Filter by the logged-in user
          .order('created_at', { ascending: false });

        if (!error && data) {
          setTransactions(data);
        }
      }
      setLoading(false);
    };

    fetchTransactions();
  }, []);

  if (loading) return <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto" /></div>;

  return (
    <Layout role="member">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
          <p className="text-gray-500">A detailed log of all your contributions.</p>
        </header>

        <div className="space-y-4">
          {transactions.length > 0 ? (
            transactions.map((tx) => (
              <div key={tx.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-green-50 p-3 rounded-xl text-green-600">
                    <ArrowDownLeft size={24} />
                  </div>
                  <div>
                    {/* Adjust these field names to match your DB column names */}
                    <p className="font-bold text-gray-900">{tx.type || 'Contribution'}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(tx.created_at).toLocaleDateString()} • {tx.payment_method || 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">KES {tx.amount.toLocaleString()}</p>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-green-600 flex items-center gap-1 justify-end">
                    <CheckCircle2 size={12} /> {tx.status || 'Completed'}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-10">No transactions found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MemberTransactions;