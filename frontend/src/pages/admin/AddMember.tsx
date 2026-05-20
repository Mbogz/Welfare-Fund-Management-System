import React from 'react';
import AddMemberForm from '../../components/AddMemberForm'; // Adjust relative path depth as needed

export default function AdminAddMemberPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full px-4 sm:px-0">
        {/* Page Section Branding Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Group Administration Portal
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Pre-authorize user registration links to secure your internal financial ledger.
          </p>
        </div>

        {/* Injected Form Component Layout */}
        <AddMemberForm />
        
      </div>
    </div>
  );
}