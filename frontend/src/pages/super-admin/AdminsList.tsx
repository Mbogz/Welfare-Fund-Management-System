import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { UserPlus, Mail, Phone, User, X, ShieldCheck } from 'lucide-react';

const AdminsList = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock data for Sean's visual layout
  const admins = [
    { id: 1, name: "Alice Wanjiku", email: "alice@tech.com", phone: "+254 712 345 678", group: "Nairobi Tech" },
    { id: 2, name: "Brian Otieno", email: "brian@unity.com", phone: "+254 722 000 111", group: "Unity Welfare" },
  ];

  return (
    <Layout role="super-admin">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">System Admins</h1>
            <p className="text-gray-500">Manage individuals with administrative rights over welfare groups.</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            <UserPlus size={20} /> Add New Admin
          </button>
        </div>

        {/* Admins Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Admin Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Contact Details</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Assigned Group</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">
                        {admin.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">{admin.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 flex flex-col">
                      <span className="flex items-center gap-1"><Mail size={14}/> {admin.email}</span>
                      <span className="flex items-center gap-1 text-gray-400"><Phone size={14}/> {admin.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">{admin.group}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                      <ShieldCheck size={16} /> Verified
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Admin Modal (Visual Only for Sean) */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Add New Admin</h2>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input type="text" placeholder="John Doe" className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input type="email" placeholder="john@example.com" className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input type="tel" placeholder="+254..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all mt-4">
                  Create Admin Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminsList;