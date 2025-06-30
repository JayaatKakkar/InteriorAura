import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Login.css';

function Admin_Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile_no, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // Basic frontend validation
    if (!name.trim() || !email.trim() || !mobile_no.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(mobile_no)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    try {
      const res = await axios.post("https://interioraura.onrender.com/api/auth/register", {
        name,
        email,
        mobile_no,
      });

      if (res.data === "The email is already registered") {
        alert("Email is already registered. Please use a different one.");
      } else if (res.data === "User registered successfully") {
        alert("Registration successful! A password has been sent to your email.");
        setMessage("Registration successful! Please check your email for the password.");
        setName("");
        setEmail("");
        setMobile("");
        navigate("/login");
      } else {
        alert("Something went wrong during registration.");
      }

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container" id="container">
      <div className="form-container sign-up-container">
        <form onSubmit={handleSignup}>
          <h1>Create Account</h1>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={mobile_no}
            onChange={(e) => setMobile(e.target.value)}
            inputMode="numeric"
            pattern="\d*"
            required
          />

          <p style={{ fontSize: "0.9rem", color: "#555" }}>
            * A login password will be sent to your registered email.
          </p>

          <button type="submit">Sign Up</button>
        </form>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <Link to="/login">
              <button className="ghost" id="signIn">Login</button>
            </Link>
          </div>
        </div>
      </div>

      {message && <div className="alert alert-success mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}

export default Admin_Signup;
