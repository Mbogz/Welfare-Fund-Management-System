import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SuperAdminLayout from './SuperAdminLayout';
import DashboardHome from './DashboardHome';
import AdminsList from './AdminsList';
import GroupsInfo from './GroupsInfo';
import SuperAdminProfile from './Profile';

export default function SuperAdminDashboard() {
  return (
    <SuperAdminLayout>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/admins" element={<AdminsList />} />
        <Route path="/groups" element={<GroupsInfo />} />
        <Route path="/profile" element={<SuperAdminProfile />} />
      </Routes>
    </SuperAdminLayout>
  );
}