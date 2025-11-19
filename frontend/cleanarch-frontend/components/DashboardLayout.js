import React from 'react';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto"> {/* Added overflow-y-auto for scrollable content */}
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
