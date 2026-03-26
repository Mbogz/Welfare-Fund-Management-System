import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Edit2, Users, Wallet, Bell, Save } from 'lucide-react';

const AdminDashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(
    "This group is dedicated to supporting Nairobi-based tech entrepreneurs with monthly savings and low-interest emergency loans."
  );

  return (
    <Layout role="admin">
      <div className="space-y-8">
        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Group Management</h1>
            <p className="text-gray-500">Nairobi Tech Savings Group</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">M-Pesa Paybill</span>
            <p className="text-lg font-mono font-bold text-blue-600">400200</p>
          </div>
        </header>

        {/* Group Description Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-800">Group Description</h2>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-medium"
            >
              {isEditing ? <><Save size={16}/> Save</> : <><Edit2 size={16}/> Edit</>}
            </button>
          </div>
          {isEditing ? (
            <textarea 
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-32"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          ) : (
            <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-dashed border-gray-200">
              {description}
            </p>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-xl text-green-600"><Wallet size={24}/></div>
            <div>
              <p className="text-sm text-gray-500">Total Funds</p>
              <p className="text-xl font-bold text-gray-900">KES 450,000</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-xl text-blue-600"><Users size={24}/></div>
            <div>
              <p className="text-sm text-gray-500">Total Members</p>
              <p className="text-xl font-bold text-gray-900">45</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-xl text-red-600"><Bell size={24}/></div>
            <div>
              <p className="text-sm text-gray-500">Pending Reminders</p>
              <p className="text-xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;