import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

const MembersPage = () => {
  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-800">Members</h1>
      <p className="mt-4 text-gray-600">This is where you'll manage your members.</p>
    </>
  );
};

MembersPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default MembersPage;
