import React from 'react';
import { Outlet } from 'react-router-dom'; // 1. Import Outlet
import Layout from '../../components/Layout';
import { Wallet, ArrowUpCircle, Clock, Star } from 'lucide-react';

const MemberDashboard = () => {
  return (
    <Layout role="member">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* If you want the dashboard content to ALWAYS show, keep it here.
           If you want the dashboard content to disappear when switching to 
           'Transactions' or 'Payment Bot', move this header/grid code 
           into a separate Home.tsx component and use Outlet for everything.
        */}
        
        <header>
          <h1 className="text-2xl font-bold text-gray-900">My Finances</h1>
          <p className="text-gray-500">Overview of your contributions.</p>
        </header>

        {/* This Outlet renders the content of your child routes (Transactions, etc.) */}
        <Outlet /> 

        {/* Keep your main dashboard cards here if you want them to be 
           visible even when looking at other sections.
        */}
      </div>
    </Layout>
  );
};

export default MemberDashboard;