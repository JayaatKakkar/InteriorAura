import React, { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch("https://interioraura.onrender.com/orders"); // adjust API URL
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Orders</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Order ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Product</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Price</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Order Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id || order.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{order._id || order.id}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{order.productDetails?.name_prod || "N/A"}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>₹{order.discount?.totalAfterDiscount?.toFixed(2) || "0.00"}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{order.status || "Pending"}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{new Date(order.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
