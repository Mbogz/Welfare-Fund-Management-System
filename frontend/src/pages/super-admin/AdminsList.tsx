import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { ShieldAlert, UserPlus, ShieldCheck, RefreshCw, Mail, Phone, User, Trash2, X, AlertTriangle } from 'lucide-react';

interface AdminProfile {
  id: string;
  full_name: string;
  phone_number: string;
  email: string;
  role: 'admin' | 'member';
  joined_at: string;
}

export default function AdminsList() {
  // Form Entry Variable States
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Directory Data States
  const [admins, setAdmins] = useState<AdminProfile[]>([]);
  const [tableLoading, setTableLoading] = useState(true);

  // MODAL STATES: Tracks the targeted admin row selected for removal
  const [activeDeleteTarget, setActiveDeleteTarget] = useState<AdminProfile | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchAdmins = async () => {
    setTableLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, phone_number, email, role, joined_at')
        .eq('role', 'admin')
        .order('joined_at', { ascending: false });

      if (error) throw error;
      setAdmins(data || []);
    } catch (err: any) {
      console.error('Error fetching admin profiles:', err.message);
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormStatus(null);

    if (!fullName || !phoneNumber || !email) {
      setFormStatus({ type: 'error', message: 'All parameter metrics (including email) are explicitly required.' });
      setFormLoading(false);
      return;
    }

    try {
      // FIX: Generates a clean, properly formatted native standard UUID to satisfy PostgreSQL syntax constraints
      const placeholderId = crypto.randomUUID();

      // 1. Insert the pre-authorized profile directly into the profiles ledger database
      const { error: dbError } = await supabase
        .from('profiles')
        .insert([
          { 
            id: placeholderId,
            full_name: fullName, 
            phone_number: phoneNumber,
            email: email.trim().toLowerCase(),
            role: 'admin'
          }
        ]);

      if (dbError) throw dbError;

      // 2. Fire off the automated secure onboarding invitation magic link email
      const { error: inviteError } = await supabase.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: {
          shouldCreateUser: true, // Auto-registers a secure auth slot upon initial magic link email click
          emailRedirectTo: window.location.origin + '/admin' // Deep-links them straight into their control workspace layout
        }
      });

      if (inviteError) throw inviteError;

      setFormStatus({ 
        type: 'success', 
        message: `Tenant instance provisioned! Onboarding secure magic link dispatched to ${email} successfully.` 
      });
      
      setFullName('');
      setPhoneNumber('');
      setEmail('');
      fetchAdmins(); // Dynamically update data view metrics without page reloads
    } catch (error: any) {
      setFormStatus({ type: 'error', message: error.message || 'Server system execution error.' });
    } finally {
      setFormLoading(false);
    }
  };

  // TARGETED INSTANCE DELETION DEPLOYMENT
  const executeAdminDeletion = async () => {
    if (!activeDeleteTarget) return;
    setDeleteLoading(true);
    const targetId = activeDeleteTarget.id;

    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', targetId);

      if (error) throw error;

      setAdmins(prev => prev.filter(admin => admin.id !== targetId));
      setActiveDeleteTarget(null); // Safely collapse modal panel
    } catch (err: any) {
      console.error('Database rejection error:', err);
      setFormStatus({ type: 'error', message: `Database rejected operations: ${err.message}` });
      setActiveDeleteTarget(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 mt-4 relative">
      
      {/* Upper Branding Header Banner */}
      <div className="flex items-center space-x-3 border-b border-gray-200 pb-4">
        <div className="p-3 bg-red-50 text-red-600 rounded-xl">
          <ShieldAlert className="h-7 w-7" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">System Admin Configuration Gate</h1>
          <p className="text-sm text-gray-500 mt-0.5">Global SaaS panel to provision administrators, dispatch mail links, and audit instances.</p>
        </div>
      </div>

      {/* Main Form + Table Data Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Onboarding Creation Form Card Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-2 mb-6 text-gray-900">
            <UserPlus className="h-5 w-5 text-indigo-500" />
            <h2 className="text-lg font-bold">Onboard Tenant Admin</h2>
          </div>

          {formStatus && (
            <div className={`p-4 rounded-lg text-xs mb-4 ${formStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {formStatus.message}
            </div>
          )}

          <form onSubmit={handleCreateAdmin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Admin Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  placeholder="e.g. Managing Director Name"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Secure Destination Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  placeholder="admin@welfaregroup.org"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">M-Pesa Mobile Gateway Phone</label>
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
              disabled={formLoading}
              className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium tracking-wide shadow-sm transition-all disabled:opacity-50"
            >
              {formLoading ? 'Dispatching Invitations...' : 'Deploy & Invite Admin'}
            </button>
          </form>
        </div>

        {/* Directory Ledger Rows Container */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <h3 className="text-base font-bold text-gray-900">Active Tenant Admin Directory</h3>
            <button
              onClick={fetchAdmins}
              className="p-1.5 border border-gray-200 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
            >
              <RefreshCw className={`h-4 w-4 ${tableLoading ? 'animate-spin text-indigo-500' : ''}`} />
            </button>
          </div>

          <div className="overflow-x-auto">
            {tableLoading ? (
              <div className="text-center py-12 text-xs text-gray-400">Loading master cluster directories...</div>
            ) : admins.length === 0 ? (
              <div className="text-center py-12 text-xs text-gray-400">No registered system administrators. Provision one from the left panel.</div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-3">Supervised Domain Name</th>
                    <th className="px-6 py-3">Onboarding Identity Mail</th>
                    <th className="px-6 py-3">Clearance Rating</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {admins.map((admin) => (
                    <tr key={admin.id} className="hover:bg-gray-50/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-900">
                        <div>
                          <div className="font-bold text-gray-900">{admin.full_name}</div>
                          <div className="text-[11px] text-gray-400 font-mono tracking-wider mt-0.5">{admin.phone_number}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-gray-600">{admin.email || 'No email parsed'}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100">
                          <ShieldCheck className="h-3 w-3" />
                          SaaS Admin Instance
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setActiveDeleteTarget(admin)}
                          className="p-1.5 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
                          title="Deprovision Admin"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>

      {/* ====================================================================
          PROFESSIONAL FLOATING MODAL CARD OVERLAY (NO MORE BROWSER ALERTS!)
         ==================================================================== */}
      {activeDeleteTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl border border-gray-100 space-y-6 animate-in zoom-in-95 duration-150">
            
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3 text-red-600">
                <div className="p-2 bg-red-50 rounded-lg">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-black text-gray-900">Revoke Infrastructure Access</h3>
              </div>
              <button 
                onClick={() => setActiveDeleteTarget(null)}
                className="p-1 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Are you absolutely certain you want to permanently strip administrative clearance from <span className="font-bold text-gray-900">"{activeDeleteTarget.full_name}"</span> ({activeDeleteTarget.email})? 
                This action immediately locks their token layout and revokes login clearance.
              </p>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveDeleteTarget(null)}
                disabled={deleteLoading}
                className="px-4 py-2 border border-gray-200 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeAdminDeletion}
                disabled={deleteLoading}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-sm font-medium rounded-lg text-white shadow-sm transition-all disabled:opacity-50"
              >
                {deleteLoading ? 'Wiping records...' : 'Confirm Revocation'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}