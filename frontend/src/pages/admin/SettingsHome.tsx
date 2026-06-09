import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseclient';
import { Loader2 } from 'lucide-react';

const SettingsHome = () => {
  // All state variables
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [paymentType, setPaymentType] = useState("Paybill");
  const [paybill, setPaybill] = useState("");
  const [account, setAccount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [tillNumber, setTillNumber] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [frequency, setFrequency] = useState("Monthly");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      const { data } = await supabase.from('group_settings').select('*').maybeSingle();
      if (data) {
        setGroupName(data.group_name || "");
        setDescription(data.description || "");
        setPaymentType(data.payment_type || "Paybill");
        setTargetAmount(data.target_amount || "");
        setFrequency(data.frequency || "Monthly");
        setDeadline(data.deadline || "");
        
        // Populate specific payment fields based on type
        if (data.payment_type === 'Paybill') {
          setPaybill(data.payment_number || "");
          setAccount(data.account_name || "");
        } else if (data.payment_type === 'Buy Goods') {
          setTillNumber(data.payment_number || "");
        } else {
          setPhoneNumber(data.payment_number || "");
        }
      }
      setLoading(false);
    };
    loadSettings();
  }, []);

  const validatePhone = (num: string) => /^(07|01)\d{8}$/.test(num);

  const handleSave = async () => {
    if ((paymentType === 'Send Money' || paymentType === 'Pochi la Biashara') && !validatePhone(phoneNumber)) {
      alert("Invalid Phone Number. Must be 10 digits starting with 07 or 01.");
      return;
    }

    setSaving(true);
    const paymentValue = paymentType === 'Paybill' ? paybill : (paymentType === 'Buy Goods' ? tillNumber : phoneNumber);

    const { data: current } = await supabase.from('group_settings').select('id').maybeSingle();
    if (current) {
      const { error } = await supabase.from('group_settings').update({
        group_name: groupName,
        description,
        payment_type: paymentType,
        payment_number: paymentValue,
        account_name: account,
        target_amount: targetAmount,
        frequency,
        deadline
      }).eq('id', current.id);
      
      setSaving(false);
      if (!error) {
        setStatusMessage("Settings updated successfully!");
        setTimeout(() => setStatusMessage(null), 3000);
      }
    } else {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto" /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 p-6">
      {/* Success Notification Card */}
      {statusMessage && (
        <div className="bg-green-100 border border-green-200 text-green-800 p-4 rounded-2xl font-bold text-center animate-in fade-in slide-in-from-top-2">
          {statusMessage}
        </div>
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black">System Settings</h1>
        <button onClick={handleSave} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">
          {saving ? "Saving..." : "Push Changes Live"}
        </button>
      </div>

      {/* Basic Info */}
      <div className="bg-white p-8 rounded-3xl border shadow-sm">
        <input value={groupName} onChange={(e) => setGroupName(e.target.value)} className="text-2xl font-bold w-full outline-none border-b pb-2" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full mt-4 p-4 bg-gray-50 rounded-xl outline-none" placeholder="Description..." />
      </div>

      {/* Payment Configuration */}
      <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 space-y-4">
        <h2 className="font-bold text-emerald-900">Payment Gateway Setup</h2>
        <select value={paymentType} onChange={(e) => setPaymentType(e.target.value)} className="w-full p-3 rounded-xl border">
          <option value="Paybill">Paybill</option>
          <option value="Buy Goods">Buy Goods (Till Number)</option>
          <option value="Send Money">Send Money (Phone Number)</option>
          <option value="Pochi la Biashara">Pochi la Biashara</option>
        </select>

        {paymentType === 'Paybill' && (
          <div className="grid md:grid-cols-2 gap-4">
            <input value={paybill} onChange={(e) => setPaybill(e.target.value)} placeholder="Paybill Number" className="p-3 rounded-xl border" />
            <input value={account} onChange={(e) => setAccount(e.target.value)} placeholder="Account Number" className="p-3 rounded-xl border" />
          </div>
        )}
        {(paymentType === 'Send Money' || paymentType === 'Pochi la Biashara') && (
          <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="07xxxxxxxx" className="w-full p-3 rounded-xl border" />
        )}
        {paymentType === 'Buy Goods' && (
          <input value={tillNumber} onChange={(e) => setTillNumber(e.target.value)} placeholder="Till Number" className="w-full p-3 rounded-xl border" />
        )}
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