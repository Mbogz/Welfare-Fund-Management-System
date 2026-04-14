import React, { useState, useRef } from 'react';
import Layout from '../../components/Layout';
import { Camera, Edit3, CheckCircle, Phone, Info, TrendingUp, Save } from 'lucide-react';

const AdminDashboard = () => {
  const [groupName, setGroupName] = useState("Truth"); 
  const [description, setDescription] = useState("A brief description of our welfare goals...");
  const [logo, setLogo] = useState<string | null>(null);
  const [paybill, setPaybill] = useState("400200");
  const [account, setAccount] = useState("GROUP_ACCOUNT_NAME");
  const [targetAmount, setTargetAmount] = useState("5000");
  const [frequency, setFrequency] = useState("Month");
  const [deadline, setDeadline] = useState("2026-04-30");

  // Independent Edit Toggles
  const [editHeader, setEditHeader] = useState(false);
  const [editDesc, setEditDesc] = useState(false); // New specific state for description
  const [editMpesa, setEditMpesa] = useState(false);
  const [editTarget, setEditTarget] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Layout role="admin">
      <div className="max-w-5xl mx-auto space-y-8 pb-12">
        
        {/* Header & Logo */}
        <div className="flex flex-col items-center text-center">
          <div 
            className="relative mb-6 cursor-pointer group" 
            onClick={() => fileInputRef.current?.click()}
          >
             <div className="w-36 h-36 rounded-3xl border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden hover:border-blue-500 transition-all shadow-sm">
               {logo ? <img src={logo} alt="Logo" className="w-full h-full object-cover" /> : <Camera className="text-gray-400" size={28} />}
             </div>
             <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
          </div>

          <div className="flex items-center gap-4 justify-center">
            {editHeader ? (
              <input value={groupName} onChange={(e) => setGroupName(e.target.value)} className="text-4xl font-black text-gray-900 border-b-4 border-blue-500 outline-none bg-blue-50 px-2 rounded-t-lg w-auto text-center" />
            ) : (
              <h1 className="text-5xl font-black text-gray-900 tracking-tight italic">{groupName}</h1>
            )}
            <button onClick={() => setEditHeader(!editHeader)} className={`p-3 rounded-2xl transition-all shadow-md ${editHeader ? 'bg-green-600 text-white' : 'bg-white text-blue-600 border border-blue-100'}`}>
              {editHeader ? <CheckCircle size={24} /> : <Edit3 size={24} />}
            </button>
          </div>
        </div>

        {/* GROUP DESCRIPTION - Now works like M-Pesa details */}
        <div className={`p-8 rounded-3xl border transition-all duration-300 ${editDesc ? 'bg-white border-blue-400 shadow-xl ring-4 ring-blue-50' : 'bg-white border-gray-100 shadow-sm'}`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-sm font-black uppercase tracking-widest flex items-center gap-2 ${editDesc ? 'text-blue-600' : 'text-gray-400'}`}>
              <Info size={20} /> Group Description
            </h3>
            <button 
              onClick={() => setEditDesc(!editDesc)} 
              className={`px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all ${editDesc ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
            >
              {editDesc ? "Save Description" : "Edit Description"}
            </button>
          </div>
          
          {editDesc ? (
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="w-full p-6 bg-blue-50/50 rounded-2xl border-2 border-blue-100 outline-none text-gray-700 font-medium focus:border-blue-400 transition-all text-lg" 
              rows={4} 
            />
          ) : (
            <p className="text-gray-600 leading-relaxed font-medium text-lg px-2">{description}</p>
          )}
        </div>

        {/* PAYMENT DETAILS */}
        <div className={`p-8 rounded-3xl border transition-all duration-300 ${editMpesa ? 'bg-white border-blue-400 shadow-xl ring-4 ring-blue-50' : 'bg-green-50 border-green-100 shadow-sm'}`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-sm font-black uppercase tracking-widest flex items-center gap-2 ${editMpesa ? 'text-blue-600' : 'text-green-800'}`}>
              <Phone size={20} /> Payment Details (M-Pesa)
            </h3>
            <button onClick={() => setEditMpesa(!editMpesa)} className={`px-4 py-2 rounded-xl text-xs font-bold shadow-sm ${editMpesa ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>
              {editMpesa ? "Save Details" : "Edit M-Pesa"}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Paybill Number</label>
              <input type="text" value={paybill} onChange={(e) => setPaybill(e.target.value)} readOnly={!editMpesa} className={`w-full p-4 rounded-xl border outline-none text-xl font-mono font-bold ${editMpesa ? 'bg-white border-blue-200 text-blue-900 shadow-inner' : 'bg-transparent border-transparent text-green-900'}`} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Account Name</label>
              <input type="text" value={account} onChange={(e) => setAccount(e.target.value)} readOnly={!editMpesa} className={`w-full p-4 rounded-xl border outline-none text-xl font-mono font-bold ${editMpesa ? 'bg-white border-blue-200 text-blue-900 shadow-inner' : 'bg-transparent border-transparent text-green-900'}`} />
            </div>
          </div>
        </div>

        {/* TARGET & DEADLINE */}
        <div className={`p-8 rounded-3xl border transition-all duration-300 ${editTarget ? 'bg-white border-blue-400 shadow-xl ring-4 ring-blue-50' : 'bg-white border-gray-100 shadow-sm'}`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-gray-900">
              <TrendingUp size={20} className="text-blue-600" /> Target & Deadline
            </h3>
            <button onClick={() => setEditTarget(!editTarget)} className={`px-4 py-2 rounded-xl text-xs font-bold shadow-sm ${editTarget ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>
              {editTarget ? "Save Target" : "Edit Target"}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Amount (KES)</label>
              <input type="number" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} readOnly={!editTarget} className={`w-full p-4 rounded-xl border outline-none font-bold text-lg ${editTarget ? 'bg-white border-blue-200 text-blue-900' : 'bg-gray-50 border-transparent text-gray-700'}`} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Frequency</label>
              <select value={frequency} onChange={(e) => setFrequency(e.target.value)} disabled={!editTarget} className={`w-full p-4 rounded-xl border font-bold outline-none ${editTarget ? 'bg-white border-blue-200 text-blue-900' : 'bg-gray-50 border-transparent text-gray-700'}`}>
                <option>Day</option><option>Week</option><option>Month</option><option>Year</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Next Deadline</label>
              <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} readOnly={!editTarget} className={`w-full p-4 rounded-xl border outline-none font-bold ${editTarget ? 'bg-white border-blue-200 text-blue-900' : 'bg-gray-50 border-transparent text-gray-700'}`} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;