import React from 'react';
import Layout from '../../components/Layout';
import { User, Mail, Shield, Smartphone, Camera } from 'lucide-react';

const SuperAdminProfile = () => {
  return (
    <Layout role="super-admin">
      <div className="max-w-3xl">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-500">Manage your personal information and system credentials.</p>
        </header>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Cover Header */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
          
          <div className="px-8 pb-8">
            {/* Profile Avatar */}
            <div className="relative -mt-12 mb-6">
              <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-lg">
                <div className="w-full h-full rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                  <User size={40} />
                </div>
              </div>
              <button className="absolute bottom-0 left-20 bg-white p-1.5 rounded-lg shadow-md border border-gray-100 text-blue-600 hover:text-blue-700">
                <Camera size={16} />
              </button>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Full Name</label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <User size={18} className="text-gray-400" />
                    <span className="text-gray-900 font-medium">Super Admin User</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email Address</label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <Mail size={18} className="text-gray-400" />
                    <span className="text-gray-900 font-medium">superadmin@welfarefund.com</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Phone Number</label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <Smartphone size={18} className="text-gray-400" />
                    <span className="text-gray-900 font-medium">+254 700 000 000</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Role Permissions</label>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <Shield size={18} className="text-blue-600" />
                    <span className="text-blue-700 font-bold">SYSTEM OWNER</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all">
                Edit Profile Information
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SuperAdminProfile;