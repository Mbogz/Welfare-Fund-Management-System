import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Search, Trash2, Users, Info, X, AlertTriangle } from 'lucide-react';

const GroupsInfo = () => {
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  
  // NEW STATE: Tracks the group ID about to be deleted.
  // When this is null, the modal is closed.
  const [groupToDelete, setGroupToDelete] = useState<number | null>(null);

  // Mock data expanded with descriptions and members
  const [groups, setGroups] = useState([
    { 
      id: 1, 
      name: "Nairobi Tech Savings Group", 
      membersCount: 24, 
      admin: "Alice Wambui",
      description: "A collective of software engineers saving for long-term investment in tech startups and real estate.",
      members: [
        { name: "David Kimani", email: "david@example.com", phone: "+254 711 000 111" },
        { name: "Sarah Omolo", email: "sarah@example.com", phone: "+254 722 000 222" },
        { name: "Kevin Mutua", email: "kevin@example.com", phone: "+254 733 000 333" }
      ]
    },
    { 
      id: 2, 
      name: "Mombasa Traders Welfare", 
      membersCount: 15, 
      admin: "John Doe",
      description: "Logistics and trade professionals focusing on short-term credit facilities for import/export duties.",
      members: [
        { name: "John Doe", email: "john@example.com", phone: "+254 744 000 444" }
      ]
    }
  ]);

  // Updated function to open the custom modal instead of a prompt
  const initiateDelete = (id: number) => {
    setGroupToDelete(id);
  };

  // Function to finalize deletion
  const finalizeDelete = () => {
    if (groupToDelete) {
      setGroups(groups.filter(g => g.id !== groupToDelete));
      if (selectedGroup?.id === groupToDelete) setSelectedGroup(null);
      setGroupToDelete(null); // Close the modal
    }
  };

  // Function to find group name for modal
  const getGroupToDeleteName = () => {
    return groups.find(g => g.id === groupToDelete)?.name;
  };

  return (
    <Layout role="super-admin">
      <div className="max-w-7xl mx-auto flex gap-6">
        {/* Main List Section */}
        <div className={`transition-all duration-300 ${selectedGroup ? 'w-1/2' : 'w-full'}`}>
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Registered Groups</h1>
            <p className="text-gray-500">Monitor and manage all welfare groups on the platform.</p>
          </header>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Group Name</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Members</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {groups.map((group) => (
                  <tr 
                    key={group.id} 
                    className={`cursor-pointer transition-colors ${selectedGroup?.id === group.id ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
                    onClick={() => setSelectedGroup(group)}
                  >
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{group.name}</p>
                      <p className="text-xs text-gray-500">Admin: {group.admin}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{group.membersCount}</td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          initiateDelete(group.id); // Open custom modal
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Group"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Panel */}
        {selectedGroup && (
          <div className="w-1/2 bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sticky top-8 h-fit animate-in slide-in-from-right-4 duration-300">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
                <Users size={24} />
              </div>
              <button 
                onClick={() => setSelectedGroup(null)}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-400"
              >
                <X size={20} />
              </button>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedGroup.name}</h2>
            
            <div className="mb-8">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                <Info size={14} /> Description
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm bg-gray-50 p-4 rounded-xl">
                {selectedGroup.description}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Group Members</h3>
              <div className="space-y-3">
                {selectedGroup.members.map((m: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-blue-100 transition-colors">
                    <div>
                      <p className="font-bold text-sm text-gray-900">{m.name}</p>
                      <p className="text-xs text-gray-500">{m.email}</p>
                    </div>
                    <p className="text-xs font-mono text-gray-400">{m.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================= */}
      {/* CUSTOM DELETION CONFIRMATION MODAL CARD */}
      {/* ========================================= */}
      {groupToDelete !== null && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-lg p-10 animate-in zoom-in duration-300">
            <div className="flex flex-col items-center text-center">
              {/* Critical Icon Section */}
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-6 border-4 border-red-50">
                <AlertTriangle size={40} />
              </div>

              {/* Text Context */}
              <h2 className="text-2xl font-extrabold text-gray-950 tracking-tight">System Confirmation Required</h2>
              <p className="text-gray-600 mt-4 leading-relaxed px-2">
                You are initiating the complete deletion of the group <strong className="text-red-700">{getGroupToDeleteName()}</strong>.
              </p>
              <p className="text-red-700 bg-red-50 font-bold p-4 rounded-2xl mt-6 text-sm flex items-center gap-2 border border-red-100">
                <AlertTriangle size={16} /> This action cannot be undone, and all associated member access will be severed immediately.
              </p>
              
              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 w-full mt-10 pt-8 border-t border-gray-100">
                <button 
                  onClick={() => setGroupToDelete(null)}
                  className="w-full text-center py-4 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={finalizeDelete}
                  className="w-full bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-100"
                >
                  Yes, Delete Entirely
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default GroupsInfo;