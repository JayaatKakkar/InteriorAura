import React, { useState } from "react";
import axios from "axios";
import styles from "./forgot.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/vendor_auth/forgot-password", {
        email,
      });
      setMessage(res.data.message || "Password reset link sent to your email.");
      setEmail("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className={styles.forgotPasswordContainer}>
      <div className={styles.forgotPasswordForm}>
        <h2 className={styles.forgotPasswordHeading}>Forgot Password</h2>
        <form onSubmit={handleForgotPassword}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.formInput}
            />
          </div>
          <button type="submit" className={styles.formButton}>
            Send Reset Link
          </button>
        </form>
        {message && <div className={`${styles.alert} ${styles.alertSuccess}`}>{message}</div>}
        {error && <div className={`${styles.alert} ${styles.alertDanger}`}>{error}</div>}
      </div>
    </div>
  );
};

export default ForgotPassword;
