import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Architect_Login = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [mobile_no, setMobile] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handlePanelSwitch = (loginMode) => {
    setIsLogin(loginMode);
    setName("");
    setSignupEmail("");
    setLoginEmail("");
    setPassword("");
    setMobile("");
    setError("");
    setMessage("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/architect_auth/login", {
        email: loginEmail,
        password,
      });

      setLoginEmail("");
      setPassword("");
       setMobile("");
      localStorage.setItem("Archtoken", res.data.token);
      localStorage.setItem("arch", JSON.stringify(res.data.user));
      setIsAuthenticated(true);
      navigate("/"); // Redirect to homepage
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!name.trim() || !signupEmail.trim() || !mobile_no.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    if (!signupEmail.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(mobile_no)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/architect_auth/register", {
        name,
        email: signupEmail,
        mobile_no,
      });

      alert(res.data.message);

      if (res.data.message.includes("User registered")) {
        setName("");
        setSignupEmail("");
        setMobile("");
        setIsLogin(true);
        navigate("/login");
      }
    } catch (err) {
      const serverMsg = err.response?.data?.message;
      if (serverMsg === "Email already exists") {
        alert("This email is already registered. Please use a different one.");
      } else {
        alert(serverMsg || "Something went wrong");
      }
    }
  };

  return (
    <div className={`container ${isLogin ? "right-panel-active" : ""}`} id="container">
      {/* Internal CSS */}
      <style>
        {`
          * {
            box-sizing: border-box;
          }

          body {
            font-family: 'Arial', sans-serif;
           background: url('https://www.shutterstock.com/image-photo/architectural-details-welsh-assembly-building-600nw-524570704.jpg') no-repeat center center;
           background-size: cover; 
           display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }

          .container {
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
            position: relative;
            overflow: hidden;
            width: 768px;
            max-width: 100%;
            min-height: 480px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .form-container {
            position: absolute;
            top: 0;
            height: 100%;
            transition: all 0.6s ease-in-out;
          }

          .sign-in-container {
            left: 50%;
            opacity: 0;
            transform: translateX(100%);
          }

          .sign-up-container {
            left: 0;
            opacity: 1;
            transform: translateX(0);
          }

          .container.right-panel-active .sign-in-container {
            opacity: 1;
            transform: translateX(0);
          }

          .container.right-panel-active .sign-up-container {
            opacity: 0;
            transform: translateX(-100%);
          }

          form {
            background: #ffffff;
            display: flex;
            flex-direction: column;
            padding: 0 50px;
            height: 100%;
            justify-content: center;
            align-items: center;
            text-align: center;
            margin-top: -20px;
          }

          input {
            background: #eee;
            border: none;
            padding: 12px 15px;
            margin: 8px 0;
            width: 100%;
          }

          /* Increased width for login input fields */
          .sign-in-container input {
            width: 120%;  /* Increased width */
          }

          button {
            border: none;
            padding: 12px 45px;
            background-color:rgb(121, 65, 15);
            color: #fff;
            font-size: 12px;
            cursor: pointer;
            border-radius: 20px;
            transition: transform 80ms ease-in;
          }

          button.ghost {
            background-color: transparent;
            border: 1px solid #fff;
          }

          .overlay-container {
            position: absolute;
            top: 0;
            left: 50%;
            width: 50%;
            height: 100%;
            overflow: hidden;
            transition: transform 0.6s ease-in-out;
            z-index: 100;
            border-top-left-radius: 120px;
            border-bottom-left-radius: 120px;
          }

          .container.right-panel-active .overlay-container {
            transform: translateX(-100%);
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            border-top-right-radius: 120px;
            border-bottom-right-radius: 120px;
          }

          .overlay {
            background:rgba(197, 131, 90, 0.73);
            color: white;
            position: relative;
            left: -100%;
            height: 100%;
            width: 200%;
            transform: translateX(0);
            transition: transform 0.6s ease-in-out;
          }

          .container.right-panel-active .overlay {
            transform: translateX(50%);
          }

          .overlay-panel {
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 0 40px;
            text-align: center;
            height: 100%;
            width: 50%;
          }

          .overlay-left {
            transform: translateX(-20%);
            left: 0;
          }

          .overlay-right {
            right: 0;
            transform: translateX(0);
          }

          .container.right-panel-active .overlay-left {
            transform: translateX(0);
          }

          .container.right-panel-active .overlay-right {
            transform: translateX(20%);
          }
        `}
      </style>

      {/* Signup Form */}
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
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
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
          {message && <div className="alert alert-success mt-3">{message}</div>}
        </form>
      </div>

      {/* Login Form */}
      <div className="form-container sign-in-container">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>

          <input
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
          {error && <div className="alert alert-danger mt-3">{error}</div>}

          <div className="mt-3 text-center">
            <p>
              Forgot password?{" "}
              <Link to="/forgot-password" className="text-decoration-none">
                Reset here
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* Overlay Panel */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Hello, Welcome!</h1>
            <p>Don't have an account?</p>
            <button className="ghost" onClick={() => handlePanelSwitch(false)}>Register</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button className="ghost" onClick={() => handlePanelSwitch(true)}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Architect_Login;
