import React, { useEffect, useState } from "react";

export default function OrderHistoryPage() {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchOrders = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`https://interioraura.onrender.com/orders?email=${encodeURIComponent(email)}`);
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
      alert("Could not fetch order history.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Order History</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "10px", width: "300px", marginRight: "10px" }}
      />
      <button onClick={handleFetchOrders} style={{ padding: "10px 20px" }}>Search</button>

      {loading && <p>Loading orders...</p>}

      {!loading && orders.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          {orders.map((order) => (
            <div
              key={order._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "15px",
                backgroundColor: "#f9f9f9"
              }}
            >
              <p><strong>Product:</strong> {order.productDetails.name_prod}</p>
              <p><strong>Price:</strong> ₹{order.discount.price.toFixed(2)}</p>
              <p><strong>GST:</strong> ₹{order.discount.gst.toFixed(2)}</p>
              <p><strong>Discount:</strong> ₹{order.discount.discountAmount.toFixed(2)}</p>
              <p><strong>Total Paid:</strong> ₹{order.discount.totalAfterDiscount.toFixed(2)}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Ordered At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}

      {!loading && orders.length === 0 && email && (
        <p style={{ marginTop: "20px", color: "#555" }}>No orders found for this email.</p>
      )}
    </div>
  );
}
