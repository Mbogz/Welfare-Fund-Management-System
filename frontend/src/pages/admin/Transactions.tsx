import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseclient';
import { Plus, X } from 'lucide-react';

const Transactions = () => {
  const [data, setData] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState("");
  const [amount, setAmount] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    // 1. Fetch transactions
    const { data: transactions, error } = await supabase.from('transactions').select('*');
    console.log("Raw Database Response:", { transactions, error });
    if (error) {
      console.error("Error fetching transactions:", error);
    } else {
      setData(transactions || []);
    }
    
    // 2. Fetch members list for the dropdown
    const { data: profiles } = await supabase.from('profiles').select('full_name').eq('role', 'member');
    setMembers(profiles || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    if (!selectedMember || !amount) return;
    setSaving(true);
    
    // Ensure 'member_name' exists in your Supabase table 'transactions'
    const { error: insertError } = await supabase.from('transactions').insert([{ 
      member_name: selectedMember,
      amount: Number(amount),
      status: 'Completed' 
    }]);

    if (insertError) {
      console.error('Error saving transaction:', insertError);
      alert("Failed to save. Ensure 'member_name' column exists in your table.");
      setSaving(false);
      return;
    }
    
    setSaving(false);
    setIsModalOpen(false);
    setSelectedMember("");
    setAmount("");
    fetchData(); // Refresh list
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Group Transactions</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={18} /> Cash Entry
        </button>
      </div>

      <table className="w-full bg-white rounded-xl shadow-sm border">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="text-left p-4">Member</th>
            <th className="text-left p-4">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((m) => (
            <tr key={m.id} className="border-b">
              <td className="p-4">{m.member_name || "N/A"}</td>
              <td className="p-4 font-bold text-blue-600">KES {Number(m.amount).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-bold">New Cash Entry</h2>
              <button onClick={() => setIsModalOpen(false)}><X size={20} /></button>
            </div>
            
            <label className="block text-sm font-bold mb-1">Select Member</label>
            <select 
              className="w-full p-3 border rounded-lg mb-3"
              value={selectedMember} 
              onChange={(e) => setSelectedMember(e.target.value)}
            >
              <option value="">-- Choose a member --</option>
              {members.map((m, index) => (
                <option key={index} value={m.full_name}>{m.full_name}</option>
              ))}
            </select>

            <label className="block text-sm font-bold mb-1">Amount (KES)</label>
            <input 
              type="number"
              className="w-full p-3 border rounded-lg mb-6"
              value={amount} onChange={(e) => setAmount(e.target.value)}
            />
            <button 
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold"
            >
              {saving ? "Saving..." : "Save Entry"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;