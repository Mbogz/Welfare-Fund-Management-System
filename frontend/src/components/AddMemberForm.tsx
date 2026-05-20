import React, { useState } from 'react';
import { supabase } from "../lib/supabaseClient"; 
import { UserPlus, CheckCircle, AlertCircle, Mail, Phone, User } from 'lucide-react';

export default function AddMemberForm() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    if (!fullName || !phoneNumber || !email) {
      setStatus({ type: 'error', message: 'All registration parameters (including email) are explicitly required.' });
      setLoading(false);
      return;
    }

    try {
      // FIX: Employs crypto-secure random browser values to pass strict postgres table validations safely
      const temporaryProfileId = crypto.randomUUID();

      // 1. Log pre-authorized member row directly inside data grids
      const { error: dbError } = await supabase
        .from('profiles')
        .insert([
          { 
            id: temporaryProfileId,
            full_name: fullName, 
            phone_number: phoneNumber,
            email: email.trim().toLowerCase(),
            role: 'member'
          }
        ]);

      if (dbError) throw dbError;

      // 2. Dispatch onboarding sign-in link directly to member inbox
      const { error: inviteError } = await supabase.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: {
          shouldCreateUser: true,
          emailRedirectTo: window.location.origin + '/member/home' // Lands them straight onto their member dashboard layout
        }
      });

      if (inviteError) throw inviteError;

      setStatus({ 
        type: 'success', 
        message: `${fullName} has been pre-authorized! An invite magic link has been fired off to their inbox.` 
      });
      
      setFullName('');
      setPhoneNumber('');
      setEmail('');
    } catch (error: any) {
      setStatus({ type: 'error', message: error.message || 'An infrastructure network error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 mt-10 border border-gray-100">
      <div className="flex items-center space-x-2 mb-6">
        <UserPlus className="h-6 w-6 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-900">Pre-Authorize New Member</h2>
      </div>

      {status && (
        <div className={`p-4 rounded-lg text-sm mb-4 flex items-center space-x-2 ${status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {status.type === 'success' ? <CheckCircle className="h-5 w-5 flex-shrink-0" /> : <AlertCircle className="h-5 w-5 flex-shrink-0" />}
          <span>{status.message}</span>
        </div>
      )}

      <form onSubmit={handleAddMember} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Invitation Destination Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              placeholder="member@welfaregroup.org"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Phone Number (M-Pesa registered)</label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              placeholder="07XXXXXXXX"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium tracking-wide shadow-sm transition-all disabled:opacity-50"
        >
          {loading ? 'Authorizing Cluster...' : 'Authorize & Invite Member'}
        </button>
      </form>
    </div>
  );
}