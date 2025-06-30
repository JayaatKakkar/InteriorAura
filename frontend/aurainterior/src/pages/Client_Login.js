import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import '../Client.css'

const  Client_Login=({setIsAuthenticated }) => {   

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
    
        try {
          const res = await axios.post("https://interioraura.onrender.com/api/client/login", {
            email,
            password,
          });
    
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setIsAuthenticated(true);
          navigate("/home"); // Navigate to Home on success
        } catch (err) {
          setError(err.response?.data?.message || "Login failed");
        }
      };


  return (
    
    <div className="form-container rounded-3 overflow-hidden" >
      <div class="form-image"></div>
      <div class="form-box">
      <h4 class="text-uppercase text-center">Login Form</h4>
            <form onSubmit={handleLogin}>
                
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Email</strong>
                    </label>
                    <input type="email" 
                    placeholder='Enter Email' 
                    autoComplete='off' 
                    name='email' 
                    value={email}
                    className='form-control rounded-0' 
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Password</strong>
                    </label>
                    <input type="password" 
                    placeholder='Enter Password' 
                    name='password' 
                    value={password}
                    className='form-control rounded-0' 
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </div>
                <button type="submit" className="btn btn-success w-100 rounded-0">
                    Login
                </button>
            </form>
            {error && <div className="alert alert-danger mt-3">{error}</div>}

            <div className="mt-3 text-center">
                <p>
                Forgot password?{" "}
                <a href="/forgot-password" className="text-decoration-none">
                    Reset here
                </a>
                </p>
          </div>
            
        </div>
    </div>

  );
}

export default Client_Login;