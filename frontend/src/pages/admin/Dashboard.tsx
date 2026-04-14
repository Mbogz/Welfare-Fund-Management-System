import React, { useState, useEffect, useRef } from 'react';
import Layout from '../../components/Layout';
import { supabase } from '../../lib/supabaseclient';
import { Camera, Save, Loader2, Info, Phone, TrendingUp, Calendar } from 'lucide-react';

const AdminDashboard = () => {
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

  // Load existing settings from the database
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
        setDeadline(data.deadline || ""); // Native date picker expects YYYY-MM-DD
        setLogo(data.logo_url || null);
      }
      setLoading(false);
    };
    loadSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    // Find the current active row (ID 3)
    const { data: current } = await supabase.from('group_settings').select('id').maybeSingle();

    if (current) {
      const { error } = await supabase
        .from('group_settings')
        .update({
          group_name: groupName,
          description: description,
          paybill: paybill,
          account_name: account,
          target_amount: targetAmount,
          frequency: frequency,
          deadline: deadline,
          logo_url: logo
        })
        .eq('id', current.id);

      if (error) {
        alert("Error: " + error.message);
      } else {
        alert("Success! All changes pushed to live. ✅");
      }
    } else {
      alert("No database row found. Please check your Supabase table.");
    }
    setSaving(false);
  };

  if (loading) return <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-blue-600" /></div>;

  return (
    <Layout role="admin">
      <div className="max-w-4xl mx-auto space-y-10 pb-20">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">System Settings</h1>
          <button 
            onClick={handleSave} 
            disabled={saving} 
            className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-blue-100 hover:scale-105 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            {saving ? "Updating..." : "Push Changes Live"}
          </button>
        </div>

        {/* Branding Section */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8 text-center">
           <div className="relative mb-6 cursor-pointer group inline-block" onClick={() => fileInputRef.current?.click()}>
             <div className="w-32 h-32 rounded-3xl border-2 border-dashed border-gray-200 flex items-center justify-center bg-gray-50 overflow-hidden shadow-inner group-hover:border-blue-400 transition-all">
               {logo ? <img src={logo} alt="Logo" className="w-full h-full object-cover" /> : <Camera className="text-gray-400" size={24} />}
             </div>
             <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {
               const file = e.target.files?.[0];
               if (file) {
                 const reader = new FileReader();
                 reader.onloadend = () => setLogo(reader.result as string);
                 reader.readAsDataURL(file);
               }
             }} />
          </div>
          <div className="text-left space-y-2">
             <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Group Title</label>
             <input 
               value={groupName} 
               onChange={(e) => setGroupName(e.target.value)} 
               className="text-3xl font-black w-full border-b-2 border-gray-100 focus:border-blue-500 outline-none pb-2 transition-colors" 
             />
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-2">
           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><Info size={14}/> Fund Description</label>
           <textarea 
             value={description} 
             onChange={(e) => setDescription(e.target.value)} 
             className="w-full p-6 bg-gray-50 rounded-2xl outline-none font-medium text-gray-700" 
             rows={3} 
           />
        </div>

        {/* M-Pesa Settings */}
        <div className="bg-emerald-50/50 p-10 rounded-[2.5rem] border border-emerald-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest flex items-center gap-2"><Phone size={14}/> M-Pesa Paybill</label>
              <input 
                value={paybill} 
                onChange={(e) => setPaybill(e.target.value)} 
                className="w-full p-5 bg-white rounded-2xl font-mono font-bold text-emerald-900 border-none shadow-sm outline-none focus:ring-2 focus:ring-emerald-400" 
              />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Account Name</label>
              <input 
                value={account} 
                onChange={(e) => setAccount(e.target.value)} 
                className="w-full p-5 bg-white rounded-2xl font-mono font-bold text-emerald-900 border-none shadow-sm outline-none focus:ring-2 focus:ring-emerald-400" 
              />
           </div>
        </div>

        {/* Contribution Settings Card */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h3 className="text-sm font-black uppercase text-gray-800 flex items-center gap-2 mb-8">
            <TrendingUp size={18} className="text-blue-600"/> Contribution Rules
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Target Amount (KES)</label>
              <input 
                type="number" 
                value={targetAmount} 
                onChange={(e) => setTargetAmount(e.target.value)} 
                className="w-full p-4 bg-gray-50 rounded-xl font-bold border-none outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Frequency</label>
              <select 
                value={frequency} 
                onChange={(e) => setFrequency(e.target.value)} 
                className="w-full p-4 bg-gray-50 rounded-xl font-bold border-none outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Monthly</option>
                <option>Weekly</option>
                <option>One-Time</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                <Calendar size={12}/> Select Deadline
              </label>
              <input 
                type="date" 
                value={deadline} 
                onChange={(e) => setDeadline(e.target.value)} 
                className="w-full p-4 bg-gray-50 rounded-xl font-bold border-none outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;