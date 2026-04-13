import React, { useState, useRef } from 'react';
import Layout from '../../components/Layout';
import { 
  Users, Wallet, Camera, Edit3, CheckCircle, 
  Phone, Info, Building2, TrendingUp, Calendar 
} from 'lucide-react';

const AdminDashboard = () => {
  const [groupName, setGroupName] = useState("Truth"); 
  const [description, setDescription] = useState("A brief description of our welfare goals...");
  const [paybill, setPaybill] = useState("400200");
  const [account, setAccount] = useState("GROUP_ACCOUNT_NAME");
  const [isEditing, setIsEditing] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);

  // Contribution Settings State
  const [targetAmount, setTargetAmount] = useState("5000");
  const [frequency, setFrequency] = useState("Month");
  const [deadline, setDeadline] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Layout role="admin">
      <div className="max-w-5xl mx-auto space-y-8 pb-12">
        {/* Header: Logo and Group Name */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-6" onClick={() => fileInputRef.current?.click()}>
            <div className="w-32 h-32 rounded-3xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden cursor-pointer bg-gray-50 hover:border-blue-500 transition-all">
              {logo ? <img src={logo} alt="Logo" className="w-full h-full object-cover" /> : <Camera className="text-gray-400" size={28} />}
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
          <div className="flex items-center gap-4">
            {isEditing ? (
              <input value={groupName} onChange={(e) => setGroupName(e.target.value)} className="text-4xl font-black text-gray-900 border-b-4 border-blue-500 outline-none text-center bg-transparent" />
            ) : (
              <h1 className="text-5xl font-black text-gray-900 tracking-tight italic">{groupName}</h1>
            )}
            <button onClick={() => setIsEditing(!isEditing)} className={`p-2 rounded-xl ${isEditing ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-blue-600'}`}>
              {isEditing ? <CheckCircle size={28} /> : <Edit3 size={28} />}
            </button>
          </div>
        </div>

        {/* Group Description */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2"><Info size={14} /> Description</h3>
          {isEditing ? (
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-4 bg-blue-50/50 rounded-xl border border-blue-100 outline-none text-sm" rows={2} />
          ) : (
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
          )}
        </div>

        {/* M-Pesa Details */}
        <div className={`p-8 rounded-2xl border transition-all ${isEditing ? 'bg-white border-blue-400 shadow-xl' : 'bg-green-50/50 border-green-100 shadow-sm'}`}>
          <h3 className={`text-sm font-bold flex items-center gap-2 mb-6 ${isEditing ? 'text-blue-700' : 'text-green-800'}`}><Phone size={20} /> M-Pesa Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <input value={paybill} onChange={(e) => setPaybill(e.target.value)} readOnly={!isEditing} className="p-4 bg-transparent border-b-2 border-gray-100 text-xl font-mono font-bold focus:border-blue-500 outline-none" placeholder="Paybill" />
            <input value={account} onChange={(e) => setAccount(e.target.value)} readOnly={!isEditing} className="p-4 bg-transparent border-b-2 border-gray-100 text-xl font-mono font-bold focus:border-blue-500 outline-none" placeholder="Account" />
          </div>
        </div>

        {/* CONTRIBUTION TARGET CARD */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2"><TrendingUp size={18} className="text-blue-600" /> Contribution Settings</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Amount Each (KES)</label>
              <input type="number" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} readOnly={!isEditing} className={`w-full p-4 rounded-xl border-none font-bold outline-none ${isEditing ? 'bg-blue-50' : 'bg-gray-50'}`} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Frequency</label>
              <select disabled={!isEditing} value={frequency} onChange={(e) => setFrequency(e.target.value)} className="w-full p-4 bg-gray-50 rounded-xl border-none font-bold outline-none">
                <option>Day</option><option>Week</option><option>Fortnight</option><option>Month</option><option>2 Months</option><option>6 Months</option><option>Year</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Deadline</label>
              <div className="relative">
                <input type="date" disabled={!isEditing} value={deadline} onChange={(e) => setDeadline(e.target.value)} className="w-full p-4 bg-gray-50 rounded-xl border-none font-bold outline-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="bg-blue-600 p-8 rounded-3xl text-white shadow-xl flex items-center gap-6">
            <Wallet size={32} />
            <div><p className="text-xs font-bold uppercase opacity-80">Total Funds</p><p className="text-3xl font-black">KES 840,000</p></div>
          </div>
          <div className="bg-purple-600 p-8 rounded-3xl text-white shadow-xl flex items-center gap-6">
            <Users size={32} />
            <div><p className="text-xs font-bold uppercase opacity-80">Members</p><p className="text-3xl font-black">24 Active</p></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;