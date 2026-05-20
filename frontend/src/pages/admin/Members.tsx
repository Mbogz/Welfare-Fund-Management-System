import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Users, ShieldAlert, ShieldCheck, RefreshCw, Search } from 'lucide-react';

interface MemberProfile {
  id: string;
  full_name: string;
  phone_number: string;
  role: 'admin' | 'member';
  joined_at: string;
}

export default function AdminMembers() {
  const [members, setMembers] = useState<MemberProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Core data fetching function from Supabase
  const fetchMembers = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: supabaseError } = await supabase
        .from('profiles')
        .select('id, full_name, phone_number, role, joined_at')
        .order('joined_at', { ascending: false });

      if (supabaseError) throw supabaseError;
      setMembers(data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to retrieve group members.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Filter members based on search bar input
  const filteredMembers = members.filter(member =>
    member.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.phone_number?.includes(searchQuery)
  );

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6">
      {/* Table Action Header Block */}
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-50/50">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Group Registration Ledger</h2>
            <p className="text-xs text-gray-500 mt-0.5">Authorized users allowed to register accounts and track transactions.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Realtime Search Bar */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or mobile..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 w-full text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Sync Refresh Action Button */}
          <button
            onClick={fetchMembers}
            disabled={loading}
            className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors disabled:opacity-50"
            title="Refresh Ledger"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin text-indigo-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Table Interface Layout View */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="text-center py-12 text-sm text-gray-500">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto text-indigo-500 mb-2" />
            Synchronizing records with secure cloud storage engine...
          </div>
        ) : error ? (
          <div className="p-6 text-center text-sm text-red-600 bg-red-50/50 rounded-b-xl">
            {error}
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Users className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <p className="text-base font-medium">No records matching parameters found</p>
            <p className="text-xs mt-1 text-gray-400">Try checking for spelling variants or pre-authorizing a new profile slot.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-gray-100">
                <th className="px-6 py-4">Authorized Full Name</th>
                <th className="px-6 py-4">M-Pesa Telephone</th>
                <th className="px-6 py-4">Clearance Role</th>
                <th className="px-6 py-4 text-right">System ID Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">{member.full_name}</td>
                  <td className="px-6 py-4 font-mono text-gray-600">{member.phone_number}</td>
                  <td className="px-6 py-4">
                    {member.role === 'admin' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-red-50 text-red-700 border border-red-100">
                        <ShieldAlert className="h-3.5 w-3.5" />
                        Administrator
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        Regular Member
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-xs text-gray-400">
                    {member.joined_at ? new Date(member.joined_at).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    }) : 'Pending'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}