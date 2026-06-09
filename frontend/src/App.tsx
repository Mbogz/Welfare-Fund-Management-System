import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Auth Pages
import Login from './pages/auth/Login';
import AccountSetup from './pages/auth/AccountSetup';

// Import Protection Guard
import ProtectedRoute from './components/ProtectedRoute';

// Import your Dashboard Pages (Replace these with your actual import paths)
import SuperAdminDashboard from './pages/super-admin/Dashboard'; 
import AdminDashboard from './pages/admin/Dashboard';
import MemberDashboard from './pages/member/Dashboard';
import TransactionsPage from './pages/member/Transactions';
import PaymentBotPage from './pages/member/PaymentBot'; 

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Auth Routes */}
        <Route path="/auth" element={<Login />} />
        <Route path="/auth/setup" element={<AccountSetup />} />

        {/* Root Redirect - Sends users to Login by default */}
        <Route path="/" element={<Navigate to="/auth" replace />} />

        {/* PROTECTED: Super Admin Zone */}
        <Route 
          path="/super-admin/*" 
          element={
            <ProtectedRoute allowedRoles={['super-admin']}>
              <SuperAdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* PROTECTED: Admin Zone */}
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'super-admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* PROTECTED: Member Zone */}
        <Route 
          path="/member/*" 
          element={
            <ProtectedRoute allowedRoles={['member', 'admin', 'super-admin']}>
              <MemberDashboard />
            </ProtectedRoute>
          } 
        />
        <Route
          path="/member/transactions"
          element={
            <ProtectedRoute allowedRoles={['member', 'admin', 'super-admin']}>
              <TransactionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/member/payment-bot"
          element={
            <ProtectedRoute allowedRoles={['member', 'admin', 'super-admin']}>
              <PaymentBotPage />
            </ProtectedRoute>
          }
        />

        {/* Catch-all for non-existent routes */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  );
}