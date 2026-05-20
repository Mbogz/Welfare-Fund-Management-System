import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SuperAdminLayout from './pages/super-admin/SuperAdminLayout';
import SuperAdminDashboard from './pages/super-admin/Dashboard';
import GroupsInfo from './pages/super-admin/GroupsInfo';
import AdminsList from './pages/super-admin/AdminsList';
import SuperAdminProfile from './pages/super-admin/Profile';
import AdminDashboard from './pages/admin/Dashboard';
import AdminMembers from './pages/admin/Members';
import AdminContributions from './pages/admin/Contributions';
import CreditRating from './pages/admin/CreditRating';
import MemberDashboard from './pages/member/Dashboard';
import PaymentBot from './pages/member/PaymentBot';
import MemberTransactions from './pages/member/Transactions';
import MemberHome from './pages/member/Home';
import AddMemberForm from './components/AddMemberForm';

function App() {
  return (
    <Router>
      <div className="h-screen w-screen overflow-x-hidden overflow-y-auto bg-gray-100">
        <Routes>
          {/* Default root redirects straight to your main dashboard flow */}
          <Route path="/" element={<Navigate to="/super-admin" replace />} />
          
          {/* ==========================================
              SUPER ADMIN NESTED GROUP LAYOUT ROUTES
             ========================================== */}
          <Route element={<SuperAdminLayout />}>
            <Route path="/super-admin" element={<SuperAdminDashboard />} />
            <Route path="/super-admin/groups" element={<GroupsInfo />} />
            <Route path="/super-admin/admins" element={<AdminsList />} />
            <Route path="/super-admin/profile" element={<SuperAdminProfile />} />
          </Route>
          
          {/* ==========================================
              ADMIN CONTROL PANEL ROUTES
             ========================================== */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/members" element={<AdminMembers />} />
          <Route path="/admin/add-member" element={<AddMemberForm />} />
          <Route path="/admin/contributions" element={<AdminContributions />} />
          <Route path="/admin/credit-rating" element={<CreditRating />} />

          {/* ==========================================
              MEMBER INTERFACE ROUTES
             ========================================== */}
          <Route path="/member" element={<MemberDashboard />} />
          <Route path="/member/home" element={<MemberHome />} />
          <Route path="/member/payment-bot" element={<PaymentBot />} />
          <Route path="/member/transactions" element={<MemberTransactions />} />

          {/* Catch-all global wildcard redirect */}
          <Route path="*" element={<Navigate to="/super-admin" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;