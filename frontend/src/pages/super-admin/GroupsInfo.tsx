import React from 'react';
import Layout from '../../components/Layout';
import { Search, Filter, MoreVertical, Users as UsersIcon } from 'lucide-react';

const GroupsInfo = () => {
  // Mock data for Sean's visual layout
  const groups = [
    { id: 1, name: "Nairobi Tech Savings", admin: "John Doe", members: 45, status: "Active" },
    { id: 2, name: "Unity Welfare Group", admin: "Jane Smith", members: 12, status: "Active" },
    { id: 3, name: "Coastal Traders Fund", admin: "Ali Hassan", members: 89, status: "Pending Review" },
  ];

  return (
    <Layout role="super-admin">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Groups Information</h1>
            <p className="text-gray-500">Managing all registered welfare groups on the platform.</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search groups..." 
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter size={18} /> Filter
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Group Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Admin</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Members</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {groups.map((group) => (
                <tr key={group.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{group.name}</td>
                  <td className="px-6 py-4 text-gray-600">{group.admin}</td>
                  <td className="px-6 py-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <UsersIcon size={16} /> {group.members}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      group.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {group.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical size={20} />
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

export default GroupsInfo;