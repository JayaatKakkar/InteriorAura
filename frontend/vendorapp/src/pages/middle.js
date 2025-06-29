
import React,{useEffect} from "react";
const Middle=()=>{
    return(
<div className="container">
<div className="page-inner">
  <div
    className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4"
  >
    {/* <div>
      <h3 className="fw-bold mb-3">Dashboard</h3>
      <h6 className="op-7 mb-2">Free Bootstrap 5 Admin Dashboard</h6>
    </div> */}
    {/* <div className="ms-md-auto py-2 py-md-0">
      <a href="#" className="btn btn-label-info btn-round me-2">Manage</a>
      <a href="#" className="btn btn-primary btn-round">Add Customer</a>
    </div> */}
  </div>
  <div className="row">
    <div className="col-sm-6 col-md-3">
      <div className="card card-stats card-round">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-icon">
              <div
                className="icon-big text-center icon-primary bubble-shadow-small"
              >
                <i className="fas fa-users"></i>
              </div>
            </div>
            <div className="col col-stats ms-3 ms-sm-0">
              <div className="numbers">
                <p className="card-category">Visitors</p>
                <h4 className="card-title">1,294</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-sm-6 col-md-3">
      <div className="card card-stats card-round">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-icon">
              <div
                className="icon-big text-center icon-info bubble-shadow-small"
              >
                <i className="fas fa-user-check"></i>
              </div>
            </div>
            <div className="col col-stats ms-3 ms-sm-0">
              <div className="numbers">
                <p className="card-category">Subscribers</p>
                <h4 className="card-title">1303</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-sm-6 col-md-3">
      <div className="card card-stats card-round">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-icon">
              <div
                className="icon-big text-center icon-success bubble-shadow-small"
              >
                <i className="fas fa-luggage-cart"></i>
              </div>
            </div>
            <div className="col col-stats ms-3 ms-sm-0">
              <div className="numbers">
                <p className="card-category">Sales</p>
                <h4 className="card-title">Rs 1,345</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-sm-6 col-md-3">
      <div className="card card-stats card-round">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-icon">
              <div
                className="icon-big text-center icon-secondary bubble-shadow-small"
              >
                <i className="far fa-check-circle"></i>
              </div>
            </div>
            <div className="col col-stats ms-3 ms-sm-0">
              <div className="numbers">
                <p className="card-category">Order</p>
                <h4 className="card-title">576</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div className="row">
    <div className="col-md-4">
      <div className="card card-round">
        <div className="card-body">
          <div className="card-head-row card-tools-still-right">
            <div className="card-title">New Customers</div>
            <div className="card-tools">
              <div className="dropdown">
                <button
                  className="btn btn-icon btn-clean me-0"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-ellipsis-h"></i>
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <a className="dropdown-item" href="#"
                    >Something else here</a
                  >
                </div>
              </div>
            </div>
          </div>
          <div className="card-list py-4">
            <div className="item-list">
              <div className="avatar">
                <img
                  src="assets/img/jm_denis.jpg"
                  alt="..."
                  className="avatar-img rounded-circle"
                />
              </div>
              <div className="info-user ms-3">
                <div className="username">Jimmy Denis</div>
                <div className="status">Graphic Designer</div>
              </div>
              <button className="btn btn-icon btn-link op-8 me-1">
                <i className="far fa-envelope"></i>
              </button>
              <button className="btn btn-icon btn-link btn-danger op-8">
                <i className="fas fa-ban"></i>
              </button>
            </div>
            <div className="item-list">
              <div className="avatar">
                <span
                  className="avatar-title rounded-circle border border-white"
                  >CF</span
                >
              </div>
              <div className="info-user ms-3">
                <div className="username">Chandra Felix</div>
                <div className="status">Sales Promotion</div>
              </div>
              <button className="btn btn-icon btn-link op-8 me-1">
                <i className="far fa-envelope"></i>
              </button>
              <button className="btn btn-icon btn-link btn-danger op-8">
                <i className="fas fa-ban"></i>
              </button>
            </div>
            <div className="item-list">
              <div className="avatar">
                <img
                  src="assets/img/talha.jpg"
                  alt="..."
                  className="avatar-img rounded-circle"
                />
              </div>
              <div className="info-user ms-3">
                <div className="username">Talha</div>
                <div className="status">Front End Designer</div>
              </div>
              <button className="btn btn-icon btn-link op-8 me-1">
                <i className="far fa-envelope"></i>
              </button>
              <button className="btn btn-icon btn-link btn-danger op-8">
                <i className="fas fa-ban"></i>
              </button>
            </div>
            <div className="item-list">
              <div className="avatar">
                <img
                  src="assets/img/chadengle.jpg"
                  alt="..."
                  className="avatar-img rounded-circle"
                />
              </div>
              <div className="info-user ms-3">
                <div className="username">Chad</div>
                <div className="status">CEO Zeleaf</div>
              </div>
              <button className="btn btn-icon btn-link op-8 me-1">
                <i className="far fa-envelope"></i>
              </button>
              <button className="btn btn-icon btn-link btn-danger op-8">
                <i className="fas fa-ban"></i>
              </button>
            </div>
            <div className="item-list">
              <div className="avatar">
                <span
                  className="avatar-title rounded-circle border border-white bg-primary"
                  >H</span
                >
              </div>
              <div className="info-user ms-3">
                <div className="username">Hizrian</div>
                <div className="status">Web Designer</div>
              </div>
              <button className="btn btn-icon btn-link op-8 me-1">
                <i className="far fa-envelope"></i>
              </button>
              <button className="btn btn-icon btn-link btn-danger op-8">
                <i className="fas fa-ban"></i>
              </button>
            </div>
            <div className="item-list">
              <div className="avatar">
                <span
                  className="avatar-title rounded-circle border border-white bg-secondary"
                  >F</span
                >
              </div>
              <div className="info-user ms-3">
                <div className="username">Farrah</div>
                <div className="status">Marketing</div>
              </div>
              <button className="btn btn-icon btn-link op-8 me-1">
                <i className="far fa-envelope"></i>
              </button>
              <button className="btn btn-icon btn-link btn-danger op-8">
                <i className="fas fa-ban"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-md-8">
      <div className="card card-round">
        <div className="card-header">
          <div className="card-head-row card-tools-still-right">
            <div className="card-title">Transaction History</div>
            <div className="card-tools">
              <div className="dropdown">
                <button
                  className="btn btn-icon btn-clean me-0"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-ellipsis-h"></i>
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <a className="dropdown-item" href="#"
                    >Something else here</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table align-items-center mb-0">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Payment Number</th>
                  <th scope="col" className="text-end">Date & Time</th>
                  <th scope="col" className="text-end">Amount</th>
                  <th scope="col" className="text-end">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <button
                      className="btn btn-icon btn-round btn-success btn-sm me-2"
                    >
                      <i className="fa fa-check"></i>
                    </button>
                    Payment from #10231
                  </th>
                  <td className="text-end">Mar 19, 2020, 2.45pm</td>
                  <td className="text-end">$250.00</td>
                  <td className="text-end">
                    <span className="badge badge-success">Completed</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <button
                      className="btn btn-icon btn-round btn-success btn-sm me-2"
                    >
                      <i className="fa fa-check"></i>
                    </button>
                    Payment from #10231
                  </th>
                  <td className="text-end">Mar 19, 2020, 2.45pm</td>
                  <td className="text-end">$250.00</td>
                  <td className="text-end">
                    <span className="badge badge-success">Completed</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <button
                      className="btn btn-icon btn-round btn-success btn-sm me-2"
                    >
                      <i className="fa fa-check"></i>
                    </button>
                    Payment from #10231
                  </th>
                  <td className="text-end">Mar 19, 2020, 2.45pm</td>
                  <td className="text-end">$250.00</td>
                  <td className="text-end">
                    <span className="badge badge-success">Completed</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <button
                      className="btn btn-icon btn-round btn-success btn-sm me-2"
                    >
                      <i className="fa fa-check"></i>
                    </button>
                    Payment from #10231
                  </th>
                  <td className="text-end">Mar 19, 2020, 2.45pm</td>
                  <td className="text-end">$250.00</td>
                  <td className="text-end">
                    <span className="badge badge-success">Completed</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <button
                      className="btn btn-icon btn-round btn-success btn-sm me-2"
                    >
                      <i className="fa fa-check"></i>
                    </button>
                    Payment from #10231
                  </th>
                  <td className="text-end">Mar 19, 2020, 2.45pm</td>
                  <td className="text-end">$250.00</td>
                  <td className="text-end">
                    <span className="badge badge-success">Completed</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <button
                      className="btn btn-icon btn-round btn-success btn-sm me-2"
                    >
                      <i className="fa fa-check"></i>
                    </button>
                    Payment from #10231
                  </th>
                  <td className="text-end">Mar 19, 2020, 2.45pm</td>
                  <td className="text-end">$250.00</td>
                  <td className="text-end">
                    <span className="badge badge-success">Completed</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <button
                      className="btn btn-icon btn-round btn-success btn-sm me-2"
                    >
                      <i className="fa fa-check"></i>
                    </button>
                    Payment from #10231
                  </th>
                  <td className="text-end">Mar 19, 2020, 2.45pm</td>
                  <td className="text-end">$250.00</td>
                  <td className="text-end">
                    <span className="badge badge-success">Completed</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
);
}
export default Middle;