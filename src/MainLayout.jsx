import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import Sidebar from './Sidebar';

const MainLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={isSidebarOpen ? "btn_one shifted" : "btn_one"}>
        <label onClick={toggleSidebar}>
          <i className="fa-solid fa-bars"></i>
        </label>
      </div>
      <main className={isSidebarOpen ? "content_area shifted" : "content_area"}>
        {/* Outlet is a placeholder where the matched child route will be rendered */}
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;