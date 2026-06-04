import React from 'react';
import AddMemberForm from '../../components/AddMemberForm';

export default function AdminAddMemberPage() {
  return (
    <div className="py-12">
      <h1 className="text-3xl font-extrabold text-center mb-6">Add New Member</h1>
      <AddMemberForm />
    </div>
  );
}