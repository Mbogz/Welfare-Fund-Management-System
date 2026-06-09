import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseclient';
import Layout from '../../components/Layout';

const MemberHome = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Replace 'get_user_transactions' with your specific database function/query
        const { data } = await supabase.rpc('get_user_transactions', { p_user_id: user.id });
        setBalance(data || 0);
      }
      setLoading(false);
    };
    fetchUserData();
  }, []);

  return (
    <Layout role="member">
      <div className="p-6">
        <h1 className="text-2xl font-bold">My Personal Overview</h1>
        <div className="bg-white p-8 rounded-3xl border mt-6">
          <p className="text-gray-500">Your Total transactions</p>
          <p className="text-4xl font-black text-blue-600">KES {balance.toLocaleString()}</p>
        </div>
      </div>
    </Layout>
  );
};
export default MemberHome;