import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseclient';
import { Trash2, X, AlertTriangle } from 'lucide-react';

export default function Members() {
  const [members, setMembers] = useState<any[]>([]);
  const [memberToDelete, setMemberToDelete] = useState<any>(null);

  const fetchMembers = async () => {
    const { data } = await supabase.from('profiles').select('*').eq('role', 'member');
    setMembers(data || []);
  };

  const deleteMember = async () => {
    if (!memberToDelete) return;
    await supabase.from('profiles').delete().eq('id', memberToDelete.id);
    setMemberToDelete(null); // Close modal
    fetchMembers(); // Refresh list
  };

  useEffect(() => { fetchMembers(); }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Members List</h2>
      <div className="bg-white rounded-xl border shadow-sm">
        <table className="w-full">
          <tbody>
            {members.map((m) => (
              <tr key={m.id} className="border-b">
                <td className="px-6 py-4">{m.full_name}</td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => setMemberToDelete(m)} 
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {memberToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-8 rounded-3xl w-full max-w-sm text-center">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={32} />
            </div>
            <h2 className="text-xl font-bold mb-2">Delete Member?</h2>
            <p className="text-gray-500 mb-8">
              Are you sure you want to remove <strong>{memberToDelete.full_name}</strong> from the group? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setMemberToDelete(null)}
                className="flex-1 py-3 rounded-xl bg-gray-100 font-bold hover:bg-gray-200"
              >
                Cancel
              </button>
              <button 
                onClick={deleteMember}
                className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}