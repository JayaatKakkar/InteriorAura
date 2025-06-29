import React, { useEffect, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";

const NavBar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [parentCategories, setParentCategories] = useState([]);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const fixedPlanCategoryId = "681e1363cd90693f726b1719";

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/home");
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

    fetch('http://localhost:5000/api/category/parents')
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched parent categories:", data);
        if (Array.isArray(data)) {
          setParentCategories(data);
        } else if (data && data.categories && Array.isArray(data.categories)) {
          setParentCategories(data.categories);
        } else {
          setParentCategories([]);
          console.error('Invalid data format:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setError('Error fetching categories');
        setParentCategories([]);
      });
  }, [isAuthenticated]);

  // Find the category with the fixed ID
  const planCategory = parentCategories.find(cat => cat._id === fixedPlanCategoryId);
  if (planCategory) {
    console.log("Plan category ID:", planCategory._id);
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top py-lg-0 px-lg-5 wow fadeIn" data-wow-delay="0.1s">
        <Link to="/" className="navbar-brand ms-4 ms-lg-0">
          <h1 className="m-0" style={{ color: "#B78D65" }}>
            <img className="me-3" src="img/icons/icon-1.png" alt="Icon" />
            Interior Aura
          </h1>
        </Link>

        <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav ms-auto p-4 p-lg-0">
            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
            <li className="nav-item"><Link to="/about" className="nav-link">How It Works</Link></li>

            <li className="nav-item dropdown">
              <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Portfolio</Link>
              <ul className="dropdown-menu border-0 m-0">
                {Array.isArray(parentCategories) && parentCategories.map(parent => (
                  <Link key={parent._id} to={`/services/${parent._id}`} className="dropdown-item">
                    {parent.name}
                  </Link>
                ))}
              </ul>
            </li>

            <li className="nav-item">
              {planCategory ? (
                <Link
                  to="/plans"
                  state={{ categoryId: fixedPlanCategoryId }}
                  className="nav-link"
                >
                  {planCategory.name}
                </Link>
              ) : (
                <span className="nav-link">Plans</span>
              )}
            </li>

            <li className="nav-item">
              {/* <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</Link>
              <ul className="dropdown-menu border-0 m-0"> */}
                {/* <li><Link to="/feature" className="dropdown-item">Our Features</Link></li> */}
                {/* <li><Link to="/project" className="dropdown-item">Our Projects</Link></li> */}
                <Link to="/team" className="nav-link">Team</Link>
                {/* <li><Link to="/appointment" className="dropdown-item">Appointment</Link></li> */}
                {/* <li><Link to="/testimonial" className="dropdown-item">Testimonial</Link></li> */}
              {/* </ul> */}
            </li>

            <li className="nav-item"><Link to="/contact" className="nav-link">Appointment</Link></li>

            <li className="nav-item dropdown">
              <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                {isAuthenticated && <i className="fas fa-user-tie" style={{ color: "#B78D65" }}></i>}&nbsp;&nbsp;
                {isAuthenticated ? username : <i className="fas fa-user-tie" style={{ color: "#B78D65" }}></i>}
              </Link>
              <ul className="dropdown-menu dropdown-menu-end">
                {!isAuthenticated ? (
                  <>
                    <li><Link className="dropdown-item" to="/login">Login</Link></li>
                    <li><Link className="dropdown-item" to="/register">Register</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link className="dropdown-item" to="/change-password">Change Password</Link></li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </ul>
          <Link
            to="/getstarted"
            className="btn py-2 px-4 d-none d-lg-block"
            style={{ backgroundColor: "#B78D65", color: "#fff", border: "none" }}
          >
            Get Started
          </Link>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default NavBar;
