import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const TopBar = ({ isAuthenticated, setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const dropdownItemStyle = {
    padding: "10px 20px",
    fontWeight: "500",
    color: "#222",
    transition: "background 0.2s ease",
    display: "flex",
    alignItems: "center",
  };

  useEffect(() => {
    if (isAuthenticated) {
      const user = localStorage.getItem("user");
      if (user) {
        try {
          const parsedUser = JSON.parse(user);
          setUsername(parsedUser.name || '');
        } catch (e) {
          console.error("Error parsing user from localStorage:", e);
          setUsername('');
        }
      }
    } else {
      setUsername('');
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="main-header">
      <div className="main-header-logo">
        <div className="logo-header" data-background-color="dark">
          <a href="index.html" className="logo d-flex align-items-center">
            <img
              src="assets/img/kaiadmin/icon-1.png"
              alt="navbar brand"
              className="navbar-brand"
              height="20"
            />
            <h2 style={{
              color: "white",
              fontWeight: "500",
              paddingBottom: "8px",
              marginLeft: "20px",
              marginTop: "20px"
            }}>
              Interior Aura
            </h2>
          </a>
          <div className="nav-toggle">
            <button className="btn btn-toggle toggle-sidebar">
              <i className="gg-menu-right"></i>
            </button>
            <button className="btn btn-toggle sidenav-toggler">
              <i className="gg-menu-left"></i>
            </button>
          </div>
          <button className="topbar-toggler more">
            <i className="gg-more-vertical-alt"></i>
          </button>
        </div>
      </div>

      <nav className="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom">
        <div className="container-fluid">
          <nav className="navbar navbar-header-left navbar-expand-lg navbar-form nav-search p-0 d-none d-lg-flex">
            &nbsp;&nbsp;
          </nav>

          <ul className="navbar-nav topbar-nav ms-md-auto align-items-center" style={{ marginRight: "25px" }}>
            <li className="nav-item dropdown">
              <Link
                to="#"
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                style={{ fontSize: "16px", fontWeight: "500", color: "#333" }}
              >
                {isAuthenticated && (
                  <i className="fas fa-user-tie" style={{ color: "#B78D65" }}></i>
                )}
                &nbsp;&nbsp;
                <span style={{ fontWeight: "bold", color: "#333" }}>
                  {isAuthenticated ? username : <i className="fas fa-user-tie" style={{ color: "#B78D65" }}></i>}
                </span>
              </Link>

              <ul
                className="dropdown-menu dropdown-menu-end"
                style={{
                  minWidth: "220px",
                  padding: "10px 0",
                  fontSize: "15px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  borderRadius: "8px",
                }}
              >
                {!isAuthenticated ? (
                  <>
                    <li>
                      <Link className="dropdown-item d-flex align-items-center" to="/login" style={dropdownItemStyle}>
                        <i className="fas fa-sign-in-alt me-2" style={{ width: "20px" }}></i>
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item d-flex align-items-center" to="/register" style={dropdownItemStyle}>
                        <i className="fas fa-user-plus me-2" style={{ width: "20px" }}></i>
                        Register
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item d-flex align-items-center" to="/change-password" style={dropdownItemStyle}>
                        <i className="fas fa-key me-2" style={{ width: "20px" }}></i>
                        Change Password
                      </Link>
                    </li>
                    <li>
                      <button
                        className="dropdown-item d-flex align-items-center"
                        onClick={handleLogout}
                        style={{ ...dropdownItemStyle, color: "#b00020" }}
                      >
                        <i className="fas fa-sign-out-alt me-2" style={{ width: "20px" }}></i>
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default TopBar;
