import React from 'react';
import { Routes, Route } from 'react-router-dom'; // No need to import Router here
import Home from './Home';
import Setting from './Setting';
import Add_device from './Add_device';
import Sidenav from './Sidenav';  // Ensure Sidenav is included

function DashboardPage() {
  return (
    <>
       {/* Include your sidenav here if you want to show it in all pages */}
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/add' exact element={<Add_device />} />
        <Route path='/setting' exact element={<Setting />} />
      </Routes>
    </>
  );
}

export default DashboardPage;
