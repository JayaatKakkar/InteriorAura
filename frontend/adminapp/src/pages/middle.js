// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const statusColors = {
//   Pending: "badge-warning",
//   Processing: "badge-info",
//   Shipped: "badge-primary",
//   Delivered: "badge-success",
//   Cancelled: "badge-danger",
// };

// const Middle = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/orders/all");
//         setOrders(response.data);
//       } catch (error) {
//         console.error("Failed to fetch orders", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <div className="container">
//       <div className="page-inner">
//         {/* Dashboard Cards */}
//        <div className="row">
//   <div className="col-sm-6 col-md-4">
//     <div className="card card-stats card-round">
//       <div className="card-body">
//         <div className="row align-items-center">
//           <div className="col-icon">
//             <div className="icon-big text-center icon-secondary bubble-shadow-small">
//               <i className="far fa-check-circle"></i>
//             </div>
//           </div>
//           <div className="col col-stats ms-3 ms-sm-0">
//             <div className="numbers">
//               <p className="card-category">Total Orders</p>
//               <h4 className="card-title">{orders.length}</h4>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>

//   <div className="col-sm-6 col-md-4">
//     <div className="card card-stats card-round">
//       <div className="card-body">
//         <div className="row align-items-center">
//           <div className="col-icon">
//             <div className="icon-big text-center icon-info bubble-shadow-small">
//               <i className="fas fa-user-check"></i>
//             </div>
//           </div>
//           <div className="col col-stats ms-3 ms-sm-0">
//             <div className="numbers">
//               <p className="card-category">Paid Orders</p>
//               <h4 className="card-title">
//                {orders.filter(order => order.status === "Paid").length}
//               </h4>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>

//   <div className="col-sm-6 col-md-4">
//     <div className="card card-stats card-round">
//       <div className="card-body">
//         <div className="row align-items-center">
//           <div className="col-icon">
//             <div className="icon-big text-center icon-success bubble-shadow-small">
//               <i className="fas fa-rupee-sign"></i>
//             </div>
//           </div>
//           <div className="col col-stats ms-3 ms-sm-0">
//             <div className="numbers">
//               <p className="card-category">Total Sales</p>
//               <h4 className="card-title">
//                 ₹
//                 {orders && orders
//                  .filter(order => order.status === "Paid")
//                   .reduce(
//                     (sum, order) =>
//                       sum +
//                       (order.discount?.totalAfterDiscount || 0),
//                     0
//                   )
//                   .toFixed(2)}
                  
//               </h4>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>


//         {/* Transaction Table */}
//         <div className="row">
//           <div className="col-md-12">
//             <div className="card card-round">
//               <div className="card-header">
//                 <div className="card-head-row card-tools-still-right">
//                   <div className="card-title">Transaction History</div>
//                 </div>
//               </div>
//               <div className="card-body p-0">
//                 {loading ? (
//                   <div className="p-4 text-center text-muted">Loading orders...</div>
//                 ) : orders.length === 0 ? (
//                   <div className="p-4 text-center text-muted">No orders found.</div>
//                 ) : (
//                   <div className="table-responsive">
//                     <table className="table align-items-center mb-0">
//                       <thead className="thead-light">
//                         <tr>
//                           <th scope="col">Order ID</th>
//                           <th scope="col" className="text-end">Customer</th>
//                           <th scope="col" className="text-end">Product</th>
//                           <th scope="col" className="text-end">Date & Time</th>
//                           <th scope="col" className="text-end">Amount</th>
//                           <th scope="col" className="text-end">Status</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {orders.map((order) => (
//                           <tr key={order._id}>
//                             <th scope="row">
//                               <button className="btn btn-icon btn-round btn-success btn-sm me-2">
//                                 <i className="fa fa-check"></i>
//                               </button>
//                               {order._id}
//                             </th>
//                             <td className="text-end">{order.userDetails?.name}</td>
//                             <td className="text-end">{order.productDetails?.name_prod}</td>
//                             <td className="text-end">
//                               {new Date(order.createdAt).toLocaleString()}
//                             </td>
//                             <td className="text-end">₹{order.discount?.totalAfterDiscount?.toFixed(2)}</td>
//                             <td className="text-end">
//                               <span className={`badge ${statusColors[order.status] || "badge-secondary"}`}>
//                                 {order.status}
//                               </span>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Middle;
import React, { useEffect, useState } from "react";
import axios from "axios";

const statusColors = {
  Pending: "badge-warning",
  Processing: "badge-info",
  Shipped: "badge-primary",
  Delivered: "badge-success",
  Cancelled: "badge-danger",
};

const Middle = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // const response = await axios.get(
        //   process.env.PUBLIC_URL + "/orders/all"
        // );
         const response = await axios.get(
          "https://interioraura.onrender.com/orders/all"
        );
        setOrders(response.data || []);
      } catch (error) {
        console.error("Failed to fetch orders", error);
        setOrders([]); // fallback to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const paidOrders = orders?.filter((o) => o.status === "Paid") || [];
  const totalSales = paidOrders.reduce(
    (sum, order) => sum + (order.discount?.totalAfterDiscount || 0),
    0
  );

  return (
    <div className="container">
      <div className="page-inner">
        {/* Dashboard Cards */}
        <div className="row">
          <div className="col-sm-6 col-md-4">
            <div className="card card-stats card-round">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-icon">
                    <div className="icon-big text-center icon-secondary bubble-shadow-small">
                      <i className="far fa-check-circle"></i>
                    </div>
                  </div>
                  <div className="col col-stats ms-3 ms-sm-0">
                    <div className="numbers">
                      <p className="card-category">Total Orders</p>
                      <h4 className="card-title">{orders?.length || 0}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-md-4">
            <div className="card card-stats card-round">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-icon">
                    <div className="icon-big text-center icon-info bubble-shadow-small">
                      <i className="fas fa-user-check"></i>
                    </div>
                  </div>
                  <div className="col col-stats ms-3 ms-sm-0">
                    <div className="numbers">
                      <p className="card-category">Paid Orders</p>
                      <h4 className="card-title">{paidOrders.length}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-md-4">
            <div className="card card-stats card-round">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-icon">
                    <div className="icon-big text-center icon-success bubble-shadow-small">
                      <i className="fas fa-rupee-sign"></i>
                    </div>
                  </div>
                  <div className="col col-stats ms-3 ms-sm-0">
                    <div className="numbers">
                      <p className="card-category">Total Sales</p>
                      <h4 className="card-title">₹{totalSales.toFixed(2)}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="row">
          <div className="col-md-12">
            <div className="card card-round">
              <div className="card-header">
                <div className="card-head-row card-tools-still-right">
                  <div className="card-title">Transaction History</div>
                </div>
              </div>
              <div className="card-body p-0">
                {loading ? (
                  <div className="p-4 text-center text-muted">
                    Loading orders...
                  </div>
                ) : orders.length === 0 ? (
                  <div className="p-4 text-center text-muted">
                    No orders found.
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table align-items-center mb-0">
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Order ID</th>
                          <th scope="col" className="text-end">
                            Customer
                          </th>
                          <th scope="col" className="text-end">
                            Product
                          </th>
                          <th scope="col" className="text-end">
                            Date & Time
                          </th>
                          <th scope="col" className="text-end">
                            Amount
                          </th>
                          <th scope="col" className="text-end">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order._id}>
                            <th scope="row">
                              <button className="btn btn-icon btn-round btn-success btn-sm me-2">
                                <i className="fa fa-check"></i>
                              </button>
                              {order._id}
                            </th>
                            <td className="text-end">
                              {order.userDetails?.name || "N/A"}
                            </td>
                            <td className="text-end">
                              {order.productDetails?.name_prod || "N/A"}
                            </td>
                            <td className="text-end">
                              {new Date(order.createdAt).toLocaleString()}
                            </td>
                            <td className="text-end">
                              ₹{(order.discount?.totalAfterDiscount || 0).toFixed(2)}
                            </td>
                            <td className="text-end">
                              <span
                                className={`badge ${
                                  statusColors[order.status] || "badge-secondary"
                                }`}
                              >
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Middle;
