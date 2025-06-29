// App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AboutPage from './Pagess/AboutPage';
import AppointmentPage from './Pagess/AppointmentPage';
import ServicesPage from './Pagess/ServicesPage';
import FeaturesPage from './Pagess/FeaturesPage';
import ProjectPage from './Pagess/ProjectPage';
import TeamPage from './Pagess/TeamPage';
import TestimonialPage from './Pagess/TestemonialPage';
import ContactPage from './Pagess/ContactPage';
import Home from "./pages/Home";
import Client_Login from "./pages/Client_Login";
import Register from "./pages/Client_Signup";
import ResetPassword from "./components/client_ResetPassword";
import ForgotPassword from "./components/client_ForgotPassword";
import ChangePassword from "./components/client_ChangePassword";
import NavBar from "./components/NavBar";
import PlansPage from "./Pagess/PlansPage";
import PlansPageShow from "./Pagess/PlansPageShow";
import GetstartedPage from "./Pagess/GetstartedPage";
import VendorDetails from "./Pagess/VendorDetails"; 
import BuyNowForm from "./Pagess/BuyNowForm";
import Cart from "./Pagess/cart"; 
import { CartProvider } from './contexts/CartContext';
import OrdersPage from './Pagess/OrdersPage';
import OrderHistoryPage from "./Pagess/OrderHistoryPage";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Check token existence
  }, []);

  return (
    <CartProvider>
      <Router basename="/user">
        <NavBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/about" element={<AboutPage />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/feature" element={<FeaturesPage />} />
          <Route path="/project" element={<ProjectPage />} />
          <Route path="/getstarted" element={<GetstartedPage />} />
          {/* <Route path="/services" element={<ServicesPage />} /> */}
          <Route path="/services/:parent_id" element={<ServicesPage/>} />
          <Route path="/vendor/:id" element={<VendorDetails />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/plans" element={<PlansPage/>} />
          <Route path="/plans-show" element={<PlansPageShow/>} />
          <Route path="/testemonial" element={<TestimonialPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Client_Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/buy-now" element={<BuyNowForm />} />
            <Route path="/order-history" element={<OrderHistoryPage />} />

          <Route path="/cart" element={<Cart />} />
          <Route
            path="/change-password"
            element={isAuthenticated ? <ChangePassword /> : <Navigate to="/home" />}
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
