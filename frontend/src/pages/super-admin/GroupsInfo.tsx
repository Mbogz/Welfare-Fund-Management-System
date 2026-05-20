import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Layers, PlusCircle, RefreshCw, UserCheck, Building, Trash2, X, AlertTriangle } from 'lucide-react';

interface AdminDropdownOption {
  id: string;
  full_name: string;
}

interface GroupData {
  id: string;
  group_name: string;
  created_at: string;
  admin_name: string | null;
}

export default function GroupsInfo() {
  // Creation Form States
  const [groupName, setGroupName] = useState('');
  const [selectedAdminId, setSelectedAdminId] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Table Data & Loading States
  const [adminsList, setAdminsList] = useState<AdminDropdownOption[]>([]);
  const [groups, setGroups] = useState<GroupData[]>([]);
  const [tableLoading, setTableLoading] = useState(true);

  // MODAL STATES: Tracks the specific group object selected for deletion
  const [activeDeleteTarget, setActiveDeleteTarget] = useState<GroupData | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchAvailableAdmins = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name')
        .eq('role', 'admin')
        .order('full_name', { ascending: true });

      if (error) throw error;
      setAdminsList(data || []);
    } catch (err: any) {
      console.error('Error fetching admin directory:', err.message);
    }
  };

  const fetchLiveGroups = async () => {
    setTableLoading(true);
    try {
      const { data, error } = await supabase
        .from('groups')
        .select(`
          id, 
          group_name, 
          created_at,
          admin_id,
          profiles!groups_admin_id_fkey ( full_name )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedGroups = (data || []).map((item: any) => ({
        id: item.id,
        group_name: item.group_name,
        created_at: item.created_at,
        admin_name: item.profiles ? item.profiles.full_name : 'Unassigned'
      }));

      setGroups(formattedGroups);
    } catch (err: any) {
      console.error('Error compiling group data:', err.message);
    } finally {
      setTableLoading(false);
    }
  };

  // TARGETED DELETION ROUTINE: Targeted cleanly with .eq('id', targetId)
  const executeGroupDeletion = async () => {
    if (!activeDeleteTarget) return;
    
    setDeleteLoading(true);
    const targetId = activeDeleteTarget.id;
    
    try {
      const { error } = await supabase
        .from('groups')
        .delete()
        .eq('id', targetId); // Targets strictly the single unique UUID record

      if (error) throw error;
      
      // Update UI filtering instantly matching out ONLY that ID
      setGroups(prev => prev.filter(g => g.id !== targetId));
      setActiveDeleteTarget(null); // Dismiss Modal safely
    } catch (err: any) {
      console.error('Database deletion failed:', err);
      setStatus({ type: 'error', message: `Database rejected deletion: ${err.message}` });
      setActiveDeleteTarget(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailableAdmins();
    fetchLiveGroups();
  }, []);

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setStatus(null);

    if (!groupName) {
      setStatus({ type: 'error', message: 'Group Name parameter is explicitly required.' });
      setFormLoading(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('groups')
        .insert([
          {
            group_name: groupName,
            admin_id: selectedAdminId || null
          }
        ]);

      if (error) throw error;

      setStatus({ type: 'success', message: `Welfare Group "${groupName}" successfully configured!` });
      setGroupName('');
      setSelectedAdminId('');
      fetchLiveGroups();
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || 'Failed to create group tenant.' });
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="space-y-8 mt-4 relative">
      
      {/* Upper Context Header */}
      <div className="flex items-center space-x-3 border-b border-gray-200 pb-4">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
          <Layers className="h-7 w-7" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Group Tenant Directories</h1>
          <p className="text-sm text-gray-500 mt-0.5">Provision active global welfare clusters and bind structural administration mappings.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Creation Input Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-2 mb-6 text-gray-900">
            <PlusCircle className="h-5 w-5 text-indigo-500" />
            <h2 className="text-lg font-bold">Configure New Group</h2>
          </div>

          {status && (
            <div className={`p-4 rounded-lg text-xs mb-4 ${status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {status.message}
            </div>
          )}

          <form onSubmit={handleCreateGroup} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Unique Group Name</label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  placeholder="e.g. Sherehe boys"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Assign Group Admin</label>
              <div className="relative">
                <UserCheck className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <select
                  value={selectedAdminId}
                  onChange={(e) => setSelectedAdminId(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
                >
                  <option value="">-- Choose Tenant Admin (Optional) --</option>
                  {adminsList.map((admin) => (
                    <option key={admin.id} value={admin.id}>
                      {admin.full_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={formLoading}
              className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium tracking-wide shadow-sm transition-all disabled:opacity-50"
            >
              {formLoading ? 'Configuring System...' : 'Deploy Group Tenant'}
            </button>
          </form>
        </div>

        {/* Data Table View */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <h3 className="text-base font-bold text-gray-900">Active Tenant Registry Ledger</h3>
            <button
              onClick={() => { fetchAvailableAdmins(); fetchLiveGroups(); }}
              className="p-1.5 border border-gray-200 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
            >
              <RefreshCw className={`h-4 w-4 ${tableLoading ? 'animate-spin text-indigo-500' : ''}`} />
            </button>
          </div>

          <div className="overflow-x-auto">
            {tableLoading ? (
              <div className="text-center py-12 text-xs text-gray-400">Loading master platform data...</div>
            ) : groups.length === 0 ? (
              <div className="text-center py-12 text-xs text-gray-400">No active groups provisioned yet. Create one on the left panel.</div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-3">Welfare Group Title</th>
                    <th className="px-6 py-3">Assigned Supervisor Admin</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {groups.map((group) => (
                    <tr key={group.id} className="hover:bg-gray-50/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-900">{group.group_name}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          group.admin_name === 'Unassigned' 
                            ? 'bg-amber-50 text-amber-700 border-amber-100' 
                            : 'bg-indigo-50 text-indigo-700 border-indigo-100'
                        }`}>
                          {group.admin_name}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setActiveDeleteTarget(group)}
                          className="p-1.5 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
                          title="Delete Group"
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
          PROFESSIONAL MODAL CARD OVERLAY (NO MORE BROWSER ALERTS!)
         ==================================================================== */}
      {activeDeleteTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl border border-gray-100 space-y-6 animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3 text-red-600">
                <div className="p-2 bg-red-50 rounded-lg">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-black text-gray-900">Confirm Destruction</h3>
              </div>
              <button 
                onClick={() => setActiveDeleteTarget(null)}
                className="p-1 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content Summary */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600 leading-relaxed">
                Are you absolutely sure you want to delete <span className="font-bold text-gray-900">"{activeDeleteTarget.group_name}"</span>? 
                This action is irreversible and will un-link all sub-tenant connections immediately.
              </p>
            </div>

            {/* Modal Actions */}
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
                onClick={executeGroupDeletion}
                disabled={deleteLoading}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-sm font-medium rounded-lg text-white shadow-sm transition-all disabled:opacity-50"
              >
                {deleteLoading ? 'Wiping record...' : 'Confirm Delete'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}