import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseclient';
import Layout from '../../components/Layout';
import { Wallet, Phone, Landmark, ArrowRight, Loader2 } from 'lucide-react';

const PaymentBot = () => {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      const { data } = await supabase.from('group_settings').select('payment_type, payment_number, account_name').maybeSingle();
      if (data) setSettings(data);
      setLoading(false);
    };
    fetchPaymentDetails();
  }, []);

  if (loading) return <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto" /></div>;

  return (
    <Layout role="member">
      <div className="max-w-lg mx-auto mt-12">
        <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <Wallet size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900 italic">Deposit Funds</h2>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Contribute to the group</p>
            </div>
          </div>

          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-4 gap-3 mb-8">
            {[100, 200, 500, 1000].map((val) => (
              <button 
                key={val} 
                onClick={() => setAmount(val.toString())} 
                className="bg-gray-50 py-4 rounded-2xl font-black text-gray-700 hover:bg-blue-600 hover:text-white transition-all text-sm border border-gray-100 shadow-sm"
              >
                +{val}
              </button>
            ))}
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Amount to Deposit</label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-gray-400 text-xl">KES</span>
                <input 
                  type="number" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)} 
                  placeholder="0.00" 
                  className="bg-gray-50 w-full pl-16 pr-6 py-5 rounded-2xl border-2 border-transparent focus:border-blue-400 focus:bg-white outline-none text-2xl font-black text-gray-900 transition-all shadow-inner" 
                />
              </div>
            </div>

            {/* Dynamic Payment Details Card */}
            <div className="bg-green-50/50 p-6 rounded-[2rem] border border-green-100 space-y-4 shadow-sm">
              <div className="flex justify-between items-center border-b border-green-100 pb-4">
                <span className="text-[10px] font-black text-green-700 uppercase tracking-widest flex items-center gap-2">
                  <Landmark size={14} /> {settings?.payment_type || "Payment Method"}
                </span>
                <span className="font-mono font-black text-green-900 text-lg">{settings?.payment_number || "N/A"}</span>
              </div>
              
              {settings?.account_name && (
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-green-700 uppercase tracking-widest flex items-center gap-2">
                    <Phone size={14} /> Account/Ref
                  </span>
                  <span className="font-mono font-black text-green-900 text-sm truncate ml-4">{settings.account_name}</span>
                </div>
              )}
            </div>

            <button className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-blue-100 transition-all active:scale-95 flex items-center justify-center gap-3">
              Process Deposit <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentBot;