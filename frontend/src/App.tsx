import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SuperAdminDashboard from './pages/super-admin/Dashboard';
import GroupsInfo from './pages/super-admin/GroupsInfo';
import AdminsList from './pages/super-admin/AdminsList';
import SuperAdminProfile from './pages/super-admin/Profile';
import AdminDashboard from './pages/admin/Dashboard';
import AdminMembers from './pages/admin/Members';
import AddMember from './pages/admin/AddMember';
import AdminContributions from './pages/admin/Contributions';
import CreditRating from './pages/admin/CreditRating';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to Super Admin Dashboard for now */}
        <Route path="/" element={<Navigate to="/super-admin" />} />
        
        {/* Super Admin Routes */}
        <Route path="/super-admin" element={<SuperAdminDashboard />} />

        <Route path="/super-admin/groups" element={<GroupsInfo />} />

        <Route path="/super-admin/admins" element={<AdminsList />} />

        <Route path="/super-admin/profile" element={<SuperAdminProfile  />} />
        
        {/*  Admin Routes*/}
        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/admin/members" element={<AdminMembers />} />

        <Route path="/admin/add-member" element={<AddMember />} />

        <Route path="/admin/contributions" element={<AdminContributions />} />

        <Route path="/admin/credit-rating" element={<CreditRating />} />

      </Routes>
    </Router>
  );
}

export default App;