import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabaseclient';
import { Camera, Save, Loader2, Info, Phone, TrendingUp, Calendar } from 'lucide-react';

const SettingsHome = () => {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [paybill, setPaybill] = useState("");
  const [account, setAccount] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [frequency, setFrequency] = useState("Monthly");
  const [deadline, setDeadline] = useState("");
  const [logo, setLogo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadSettings = async () => {
      const { data } = await supabase.from('group_settings').select('*').maybeSingle();
      if (data) {
        setGroupName(data.group_name || "");
        setDescription(data.description || "");
        setPaybill(data.paybill || "");
        setAccount(data.account_name || "");
        setTargetAmount(data.target_amount || "");
        setFrequency(data.frequency || "Monthly");
        setDeadline(data.deadline || "");
        setLogo(data.logo_url || null);
      }
      setLoading(false);
    };
    loadSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const { data: current } = await supabase.from('group_settings').select('id').maybeSingle();
    if (current) {
      await supabase.from('group_settings').update({
        group_name: groupName, description, paybill, account_name: account,
        target_amount: targetAmount, frequency, deadline, logo_url: logo
      }).eq('id', current.id);
      alert("Settings updated!");
    }
    setSaving(false);
  };

  if (loading) return <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto" /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black">System Settings</h1>
        <button onClick={handleSave} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2">
          {saving ? "Saving..." : "Push Changes Live"}
        </button>
      </div>

      {/* Basic Info */}
      <div className="bg-white p-8 rounded-3xl border shadow-sm">
        <input value={groupName} onChange={(e) => setGroupName(e.target.value)} className="text-2xl font-bold w-full outline-none border-b pb-2" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full mt-4 p-4 bg-gray-50 rounded-xl outline-none" placeholder="Description..." />
      </div>

      {/* M-Pesa */}
      <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold uppercase text-emerald-800">Paybill</label>
          <input value={paybill} onChange={(e) => setPaybill(e.target.value)} className="w-full p-3 rounded-xl mt-1" />
        </div>
        <div>
          <label className="text-xs font-bold uppercase text-emerald-800">Account Name</label>
          <input value={account} onChange={(e) => setAccount(e.target.value)} className="w-full p-3 rounded-xl mt-1" />
        </div>
      </div>

      {/* Rules */}
      <div className="bg-white p-8 rounded-3xl border shadow-sm grid md:grid-cols-3 gap-4">
        <input type="number" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} placeholder="Target Amount" className="p-3 bg-gray-50 rounded-xl" />
        <select value={frequency} onChange={(e) => setFrequency(e.target.value)} className="p-3 bg-gray-50 rounded-xl">
          <option>Monthly</option><option>Weekly</option><option>One-Time</option>
        </select>
        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="p-3 bg-gray-50 rounded-xl" />
      </div>
    </div>
  );
};
export default SettingsHome;