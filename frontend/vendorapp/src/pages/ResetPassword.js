import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      const res = await axios.post("http://localhost:5000/api/vendor_auth/reset-password", {
        token,
        newPassword,
      });
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      {/* Internal CSS */}
      <style>
        {`
          .reset-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;  /* To center vertically */
            background-color: #f6f5f7; /* Optional: background color for the entire page */
          }

          .reset-container {
            max-width: 400px; /* Adjust the max width as needed */
            width: 100%;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
            background-color: #fff;
          }

          .form-label {
            font-weight: bold;
          }

          .form-control {
            padding: 12px;
            font-size: 14px;
            border-radius: 5px;
            width: 100%;
          }

          .btn {
            padding: 10px 15px;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
          }

          .btn-success {
            background-color: #28a745;
            color: white;
          }

          .alert {
            padding: 10px;
            margin-top: 20px;
            font-size: 14px;
            border-radius: 5px;
          }

          .alert-success {
            background-color: #d4edda;
            color: #155724;
          }

          .alert-danger {
            background-color: #f8d7da;
            color: #721c24;
          }
        `}
      </style>

      <div className="reset-wrapper">  {/* New wrapper for centering */}
        <div className="reset-container">
          <h2 className="text-center mb-4">Reset Password</h2>
          <form onSubmit={handleReset}>
            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-100">
              Reset Password
            </button>
          </form>

          {message && <div className="alert alert-success mt-3">{message}</div>}
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
