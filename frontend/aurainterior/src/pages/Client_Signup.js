import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import axios from 'axios';

function Client_Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile_no, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/client/signup", {
        name,
        email,
        password,
        mobile_no,
      });

      setMessage(res.data.message); // success message
      setName("");
      setEmail("");
      setPassword("");
      setMobile("");
      navigate("/login")
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }

  };

  return (
    <div className="form-container rounded-3 overflow-hidden" >
      <div class="form-image"></div>
      <div class="form-box">
      <h4 class="text-uppercase text-center">Sign Up</h4>
      <form onSubmit={handleSignup}>

      <div className="mb-3">
          <label htmlFor="name">
              <strong >Name</strong>
          </label>
          <input type="text" 
          placeholder='Enter name' 
          autoComplete='off' 
          name='name' 
          value={name}
          className='form-control rounded-0' 
          onChange={(e) => setName(e.target.value)}
          required
          />
           </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              value={email}
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mobile">
              <strong>Mobile No</strong>
            </label>
            <input
              type="number"
              placeholder="Enter Mobile No"
              value={mobile_no}
              className="form-control rounded-0"
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Sign Up
          </button>
        </form>
        {message && <div className="alert alert-success mt-3">{message}</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>} 
      </div>
    </div>
  );
}

export default Client_Signup;
