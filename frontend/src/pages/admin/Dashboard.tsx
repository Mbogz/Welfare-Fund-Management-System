import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../../components/Layout';
import SettingsHome from './SettingsHome';
import Members from './Members';
import AddMember from './AddMember';
import Transactions from './Transactions';
import CreditRating from './CreditRating';

export default function AdminDashboard() {
  return (
    <Layout role="admin">
      <Routes>
        <Route path="/" element={<SettingsHome />} />
        <Route path="/members" element={<Members />} />
        <Route path="/add-member" element={<AddMember />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/credit-rating" element={<CreditRating />} />
      </Routes>
    </Layout>
  );
}