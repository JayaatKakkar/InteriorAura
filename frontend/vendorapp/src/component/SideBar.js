import { Outlet, Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sidebar" data-background-color="dark">
      <div className="sidebar-logo">
        <div className="logo-header" data-background-color="dark">
          <Link to="/" className="logo" style={{ color: "white" }}>
            <img
              src={process.env.PUBLIC_URL+"/assets/img/kaiadmin/icon-1.png"}
              alt="navbar brand"
              className="navbar-brand"
              height="50"
            />
            &nbsp; &nbsp; Interior Aura 
          </Link>
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

      <div className="sidebar-wrapper scrollbar scrollbar-inner">
        <div className="sidebar-content">
          <ul className="nav nav-secondary">
            <li className="nav-item">
              <Link to="/">
                <i className="fas fa-home" style={{ color: "#B78D65" }}></i>
                <p>Dashboard</p>
              </Link>
            </li>
            <li className="nav-section">
              <span className="sidebar-mini-icon">
                <i className="fa fa-ellipsis-h"></i>
              </span>
              <h4 className="text-section">Components</h4>
            </li>
            {/* <li className="nav-item">
              <Link to="/category">
                <i className="fas fa-box" style={{ color: "#B78D65" }}></i>
                <p>Category</p>
              </Link>
            </li> */}
           
            <li className="nav-item">
              <Link to="/material">
              <i class="fas fa-truck" style={{ color: "#B78D65" }}></i>
                <p>Material</p>
              </Link>
            </li>
            

             <li className="nav-item">
              <Link to="/vendorpricelabel">
              <i class="fas fa-envelope-open
              "  style={{ color: "#B78D65" }}></i>
                <p>Vendor Price Label</p>
              </Link>
            </li>

            {/* <li className="nav-item">
              <Link to="/offer">
                <i className="fas fa-envelope-open" style={{ color: "#B78D65" }}></i>
                <p>Offers</p>
              </Link>
            </li>

            

            <li className="nav-item">
              <Link to="/Packages">
              <i class="fas fa-briefcase"  style={{ color: "#B78D65" }}></i>
                <p>Packages</p>
              </Link>
            </li> */}




          </ul>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
