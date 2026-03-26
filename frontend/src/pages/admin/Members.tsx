import React from 'react';
import Layout from '../../components/Layout';
import { UserMinus, Mail, Phone, Calendar, Search } from 'lucide-react';

const AdminMembers = () => {
  // Mock data for Sean's visual layout
  const members = [
    { id: 1, name: "David Kimani", email: "david@example.com", phone: "0711222333", joined: "Jan 2026", status: "Active" },
    { id: 2, name: "Sarah Omolo", email: "sarah@example.com", phone: "0722333444", joined: "Feb 2026", status: "Active" },
    { id: 3, name: "Kevin Mutua", email: "kevin@example.com", phone: "0733444555", joined: "Mar 2026", status: "Late Payer" },
  ];

  const handleRemove = (name: string) => {
    alert(`System Action: Confirm removal of ${name} from the group?`);
  };

  return (
    <Layout role="admin">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Group Members</h1>
            <p className="text-gray-500">View and manage all individuals in your welfare group.</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search members..." 
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Member</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Contact</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Joined Date</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                        {member.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs space-y-1">
                      <div className="flex items-center gap-1 text-gray-600"><Mail size={12}/> {member.email}</div>
                      <div className="flex items-center gap-1 text-gray-400"><Phone size={12}/> {member.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1"><Calendar size={14}/> {member.joined}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      member.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleRemove(member.name)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove Member"
                    >
                      <UserMinus size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default AdminMembers;