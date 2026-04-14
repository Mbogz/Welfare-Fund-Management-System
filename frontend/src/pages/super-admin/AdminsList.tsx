import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { 
  Trash2, 
  ShieldCheck, 
  X, 
  AlertTriangle, 
  Mail, 
  User, 
  Building2
} from 'lucide-react';

const AdminList = () => {
  // Mock data for Admin management
  const [admins, setAdmins] = useState([
    { id: 1, name: "David Kimani", email: "david@truthgroup.com", assignedGroup: "Truth Savings", role: "Primary Admin", joined: "Jan 2026" },
    { id: 2, name: "Sarah Omolo", email: "sarah@nairobytech.com", assignedGroup: "Nairobi Tech", role: "Treasurer", joined: "Feb 2026" },
    { id: 3, name: "John Doe", email: "john@pioneers.com", assignedGroup: "Pioneer Welfare", role: "Secretary", joined: "Mar 2026" },
  ]);

  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
  const [adminToDelete, setAdminToDelete] = useState<any>(null);

  const handleDelete = (id: number) => {
    setAdmins(admins.filter(admin => admin.id !== id));
    setAdminToDelete(null);
    setSelectedAdmin(null);
  };

  return (
    <Layout role="super-admin">
      <div className="flex gap-6 relative max-w-6xl mx-auto">
        
        {/* Main List Section */}
        <div className={`transition-all duration-300 ${selectedAdmin ? 'w-2/3' : 'w-full'}`}>
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight italic">Administrators</h1>
            <p className="text-sm text-gray-500 font-medium border-l-4 border-blue-500 pl-4">Management of system-wide administrative assignments</p>
          </div>

          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50/50 border-b border-gray-50">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Admin Name</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Assigned Group</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {admins.map((admin) => (
                  <tr 
                    key={admin.id} 
                    onClick={() => setSelectedAdmin(admin)}
                    className={`cursor-pointer transition-all ${selectedAdmin?.id === admin.id ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
                  >
                    <td className="px-8 py-5 font-bold text-gray-900">
                      {admin.name}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                        <Building2 size={14} />
                        {admin.assignedGroup}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setAdminToDelete(admin);
                        }}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
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

        {/* Admin Detail Card */}
        {selectedAdmin && (
          <div className="w-1/3 bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl p-8 sticky top-8 h-fit animate-in slide-in-from-right-8 duration-500">
            <button 
              onClick={() => setSelectedAdmin(null)}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-all"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-20 h-20 rounded-3xl bg-indigo-600 flex items-center justify-center text-white shadow-lg mb-4">
                <ShieldCheck size={40} />
              </div>
              <h2 className="text-2xl font-black text-gray-900 leading-tight">{selectedAdmin.name}</h2>
              <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mt-1">{selectedAdmin.role}</p>
            </div>

            <div className="space-y-5 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Email Address</p>
                  <p className="text-sm font-bold text-gray-700">{selectedAdmin.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                  <Building2 size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Managing Group</p>
                  <p className="text-sm font-bold text-gray-700">{selectedAdmin.assignedGroup}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                  <User size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Member Since</p>
                  <p className="text-sm font-bold text-gray-700">{selectedAdmin.joined}</p>
                </div>
              </div>
            </div>
            
            {/* The "View Group Dashboard" button has been removed from here */}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {adminToDelete && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] max-w-sm w-full p-10 text-center shadow-2xl animate-in zoom-in">
            <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center text-red-600 mx-auto mb-6">
              <AlertTriangle size={40} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 italic">Revoke Access?</h3>
            <p className="text-gray-500 text-sm mt-4 leading-relaxed">
              This will remove <span className="font-bold text-gray-900">{adminToDelete.name}</span> from managing {adminToDelete.assignedGroup}.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-10">
              <button 
                onClick={() => setAdminToDelete(null)}
                className="py-4 font-bold text-gray-400 hover:bg-gray-50 rounded-2xl transition-all"
              >
                Go Back
              </button>
              <button 
                onClick={() => handleDelete(adminToDelete.id)}
                className="py-4 bg-red-600 text-white rounded-2xl font-bold shadow-lg shadow-red-100 hover:bg-red-700 transition-all"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AdminList;