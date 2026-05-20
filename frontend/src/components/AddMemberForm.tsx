import React, { useState } from 'react';
import { supabase } from '../lib/supabaseclient';
import { UserPlus, CheckCircle, AlertCircle } from 'lucide-react';

export default function AddMemberForm() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('member');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    if (!fullName || !phoneNumber) {
      setStatus({ type: 'error', message: 'Please fill in all fields.' });
      setLoading(false);
      return;
    }

    try {
      // FIX 2: Safe UUID Generator fallback if crypto.randomUUID is blocked by non-HTTPS environments
      const targetId = typeof crypto !== 'undefined' && crypto.randomUUID 
        ? crypto.randomUUID() 
        : 'fallback-' + Math.random().toString(36).substring(2, 11) + '-' + Date.now();

      const { error } = await supabase
        .from('profiles')
        .insert([
          { 
            id: targetId,
            full_name: fullName, 
            phone_number: phoneNumber, 
            role: role 
          }
        ]);

      if (error) throw error;

      setStatus({ type: 'success', message: `${fullName} has been pre-authorized successfully!` });
      setFullName('');
      setPhoneNumber('');
      setRole('member');
    } catch (error: any) {
      setStatus({ type: 'error', message: error.message || 'An error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6 mt-10">
      <div className="flex items-center space-x-2 mb-6">
        <UserPlus className="h-6 w-6 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-900">Pre-Authorize New Member</h2>
      </div>

      {status && (
        <div className={`p-4 rounded-md mb-4 flex items-center space-x-2 ${status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {status.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          <span>{status.message}</span>
        </div>
      )}

      <form onSubmit={handleAddMember} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number (M-Pesa registered)</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            placeholder="07XXXXXXXX"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">System Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          >
            <option value="member">Regular Member</option>
            <option value="admin">Group Administrator</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Authorize Member'}
        </button>
      </form>
    </div>
  );
}