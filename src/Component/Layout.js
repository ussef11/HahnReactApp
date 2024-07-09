// src/components/Layout.js
import React, { useEffect } from 'react';
import Navbar from './NavBar/NavBar';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from './SideBar/Sidebar';

const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
  
    if (localStorage.getItem('jwtToken')) {
      navigate('/profile');
    }
    else{
      navigate('/login');
    }
  }, [navigate]);
  return (
    <>
    
    <Navbar/>
   

    <Sidebar />
    <div style={{ width: "56px" }}></div>
    <Outlet />
  </>
  );
};

export default Layout;
