import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { User, Mail, Phone, UserPlus, CheckCircle2 } from 'lucide-react';

const AddMember = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Logic for Wiky to connect to Supabase later
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <Layout role="admin">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Add New Member</h1>
          <p className="text-gray-500">Register a new individual into the Nairobi Tech Savings Group.</p>
        </header>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          {submitted ? (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <CheckCircle2 size={64} className="text-green-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Member Added Successfully!</h2>
              <p className="text-gray-500 mt-2">They can now log in using their email address.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-6 text-blue-600 font-semibold hover:underline"
              >
                Add another member
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Samuel Okoth" 
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input 
                    type="email" 
                    required
                    placeholder="samuel@example.com" 
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input 
                    type="tel" 
                    required
                    placeholder="+254 7xx xxx xxx" 
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                >
                  <UserPlus size={20} /> Register Member
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
          <div className="text-blue-600 font-bold">!</div>
          <p className="text-sm text-blue-800">
            Adding a member will automatically generate a temporary password sent to their email.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AddMember;