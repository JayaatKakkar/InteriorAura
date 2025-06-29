import React, { useEffect, useState } from 'react';
import './client.css'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation,Navigate } from "react-router-dom";
import SideBar from './component/SideBar';
import TopBar from './component/TopBar';
import Footer from './component/Footer';
import Middle from './pages/middle';
import Offer from './pages/Offer';
import Admin_Login from './pages/Admin_Login';
import ResetPassword from './pages/ResetPassword';
import ChangePassword from './pages/changePassword';
import ForgotPassword from './pages/ForgotPassword';
import CategoryForm from './pages/CategoryForm';
import CategoryList from './pages/CategoryList';
import ArchitectList from './pages/ArchitectList';
import VendorList from './pages/VendorList';
import Material from './pages/Material';
import Dimension from './pages/Dimension';
import Blueprint from './pages/Blueprint';
import Packages from './pages/Packages';
import AdminDashboard from './pages/AdminDashboard';

function AppRoutes({ isAuthenticated, setIsAuthenticated }) {
  const location = useLocation();
  const path = location.pathname;

  // Check if current path is for the login or reset password pages
  const isPublic =
    path === '/login' ||
    path === '/register' ||
    path === '/forgot-password' ||
    path.startsWith('/reset-password');

    if (isPublic) {
      return (
        <div className="auth-wrapper"> {/* Make sure the auth wrapper is isolated */}
          <Routes>
            <Route path="/login" element={<Admin_Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Routes>
        </div>
      );
    }
  


    return (
      <div className="wrapper"> {/* Main app wrapper */}
        <SideBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <div className="main-panel">
          <TopBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
          <div className="container">
            <div className="page-inner">
            <Routes>
            <Route path="/" element={isAuthenticated ? <Middle /> : <Navigate to="/login" />} />
              {/* <Route path="/" element={<Middle />} />
              <Route path="/login" element={<Admin_Login1 setIsAuthenticated={setIsAuthenticated}/>} />   */}
              {/* <Route path="/reset-password/:token" element={<ResetPassword />} /> */}
              <Route path="/offer" element={<Offer />} />
              <Route path="/category" element={<CategoryList />} />
              <Route path="/architectlist" element={<ArchitectList />} />
              <Route path="/vendorlist" element={<VendorList />} />
              <Route path="/Material" element={<Material/>} />
              <Route path="/Dimension" element={<Dimension/>}/>
              <Route path="/Blueprint" element={<Blueprint/>}/>
              <Route path="/Packages" element={<Packages/>}/>
              <Route path="/quotation" element={<AdminDashboard/>}/>  
            <Route path="/change-password" element={isAuthenticated ? <ChangePassword /> : <Navigate to="/login" />} />

{/*                            
              <Route path="/register" element={<Admin_Signup/>} />
    
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/change-password"
                element={isAuthenticated ? <ChangePassword/> : <Navigate to="/login" />}
              />
              <Route
                path="/"
                element={isAuthenticated ? <Middle/> : <Navigate to="/login" />}
              /> */}
            </Routes>
          </div>
        </div>
         <Footer />
      </div>
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('Admintoken');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <BrowserRouter basename='/admin'>
      <AppRoutes isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
    </BrowserRouter>
  );
}
