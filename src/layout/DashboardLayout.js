import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import '../styles/DashboardLayout.css';

function DashboardLayout({ children, user, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="dashboard-layout">
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="main-content">
        <Navbar user={user} onLogout={onLogout} />
        <div className="content-area">
          {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
