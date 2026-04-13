import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Trash2, User, X, AlertTriangle, Calendar, Phone } from 'lucide-react';

const MembersList = () => {
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [memberToDelete, setMemberToDelete] = useState<any>(null);
  const [members, setMembers] = useState([
    { id: 1, name: "David Kimani", email: "david@example.com", phone: "+254 711 000 111", joinedDate: "Jan 12, 2026" },
    { id: 2, name: "Sarah Omolo", email: "sarah@example.com", phone: "+254 722 000 222", joinedDate: "Feb 05, 2026" },
  ]);

  return (
    <Layout role="admin">
      <div className="flex gap-6 relative">
        <div className={`transition-all duration-300 ${selectedMember ? 'w-2/3' : 'w-full'}`}>
          <h1 className="text-2xl font-bold mb-6 text-gray-900">Group Members</h1>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Member Name</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {members.map((member) => (
                  <tr key={member.id} onClick={() => setSelectedMember(member)} className="cursor-pointer hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold text-gray-900">{member.name}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={(e) => { e.stopPropagation(); setMemberToDelete(member); }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Member Detail Card */}
        {selectedMember && (
          <div className="w-1/3 bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sticky top-8 h-fit animate-in slide-in-from-right-4">
            <button onClick={() => setSelectedMember(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={20} /></button>
            <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6"><User size={32} /></div>
            <h2 className="text-2xl font-bold text-gray-900">{selectedMember.name}</h2>
            <p className="text-gray-500 text-sm mb-6">{selectedMember.email}</p>
            <div className="space-y-4 pt-6 border-t border-gray-50">
              <div className="flex items-center gap-3 text-gray-600"><Calendar size={18} /> <span>Joined {selectedMember.joinedDate}</span></div>
              <div className="flex items-center gap-3 text-gray-600"><Phone size={18} /> <span>{selectedMember.phone}</span></div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Card */}
      {memberToDelete && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-8 text-center animate-in zoom-in">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center text-red-600 mx-auto mb-4"><AlertTriangle size={32} /></div>
            <h3 className="text-xl font-bold">Remove Member?</h3>
            <p className="text-gray-500 text-sm mt-2">This will remove {memberToDelete.name} and their contribution records from this group.</p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <button onClick={() => setMemberToDelete(null)} className="py-3 font-bold text-gray-500 hover:bg-gray-50 rounded-xl">Cancel</button>
              <button className="py-3 bg-red-600 text-white rounded-xl font-bold shadow-lg shadow-red-100">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default MembersList;