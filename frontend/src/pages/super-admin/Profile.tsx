import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { User, Mail, Phone, Shield, Save, Key, CheckCircle, AlertCircle } from 'lucide-react';

export default function SuperAdminProfile() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  
  // Profile Form States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Fetch current super admin details on mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setEmail(user.email || '');
          
          const { data, error } = await supabase
            .from('profiles')
            .select('full_name, phone_number')
            .eq('id', user.id)
            .single();

          if (error) throw error;
          if (data) {
            setFullName(data.full_name || '');
            setPhoneNumber(data.phone_number || '');
          }
        }
      } catch (err: any) {
        console.error('Error loading profile:', err.message);
      }
    };

    fetchProfileData();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated session found.');

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          phone_number: phoneNumber,
        })
        .eq('id', user.id);

      if (error) throw error;
      setStatus({ type: 'success', message: 'Your profile settings have been updated successfully!' });
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || 'Failed to update profile.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    // CHANGED: Cleaned container layout to sit comfortably under your top navigation bar without sidebar grids
    <div className="max-w-4xl mx-auto space-y-8 mt-4 px-4 pb-12">
      
      {/* Header Banner */}
      <div className="flex items-center space-x-3 border-b border-gray-200 pb-4">
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
          <Shield className="h-7 w-7" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Super Admin Profile Settings</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage your structural identity details and system communication channels.</p>
        </div>
      </div>

      {status && (
        <div className={`p-4 rounded-xl text-sm flex items-center space-x-2 border ${
          status.type === 'success' 
            ? 'bg-green-50 text-green-800 border-green-100' 
            : 'bg-red-50 text-red-800 border-red-100'
        }`}>
          {status.type === 'success' ? <CheckCircle className="h-5 w-5 flex-shrink-0" /> : <AlertCircle className="h-5 w-5 flex-shrink-0" />}
          <span>{status.message}</span>
        </div>
      )}

      {/* Main Account Settings Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-2 mb-6 text-gray-900 border-b border-gray-50 pb-3">
          <User className="h-5 w-5 text-gray-400" />
          <h2 className="text-lg font-bold">Personal Credentials</h2>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Account Role</label>
              <div className="relative">
                <Shield className="absolute left-3 top-3 h-4 w-4 text-indigo-500" />
                <input
                  type="text"
                  disabled
                  value="Global Super Administrator"
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-100 bg-gray-50 text-gray-500 font-medium cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Login Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  disabled
                  value={email}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-100 bg-gray-50 text-gray-500 font-mono cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Full Identity Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  placeholder="Your Full Name"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">M-Pesa Registered Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  placeholder="e.g. 07XXXXXXXX"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-50">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium tracking-wide shadow-sm transition-all disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              <span>{loading ? 'Saving Profile Changes...' : 'Save Profile Details'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Security Info Panel */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 flex items-start space-x-4">
        <div className="p-2 bg-white rounded-lg shadow-sm text-gray-400">
          <Key className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-gray-900">Authentication Safeguards</h3>
          <p className="text-xs text-gray-500 leading-relaxed max-w-2xl">
            Your login parameters and access clearance ratings are strictly verified through Supabase Auth infrastructure. To modify password attributes or rotate cryptographic tokens, check your linked administrative identity inbox.
          </p>
        </div>
      </div>

    </div>
  );
}