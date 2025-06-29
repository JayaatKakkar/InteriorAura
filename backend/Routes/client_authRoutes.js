// routes/authRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Client = require("../Models/Client");
const crypto = require("crypto");
const router = express.Router();
const authMiddleware = require("../middleware/client_authMiddleware");
// const nodemailer = require("nodemailer");
const sendEmail = require("../utils/client_SendEmail");

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// });

// Signup
router.post("/signup", async (req, res) => {
  console.log(req.body)
    try {
      const { name, email } = req.body;
  
      // Check if user already exists
      let user = await Client.findOne({ email });
      if (user) return res.status(400).json({ message: "User already exists" });
  
      // Generate a random password
      const generatedPassword = crypto.randomBytes(6).toString("hex");
  
      // Hash the password before storing
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);
  
      // Create new user
      user = new Client({ name, email, password: hashedPassword });
      await user.save();
  
      // Send the password via email
      await sendEmail(email, "Your Account Credentials", `Your password: ${generatedPassword}`);
  
      res.status(201).json({ message: "User registered. Check your email for login credentials." });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Client.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// Change Password
router.post("/change-password", authMiddleware, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await Client.findById(req.user.id);
    if (!user) return res.status(400).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect old password" });
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: "Password changed successfully" });
});


// Forgot Password
router.post("/forgot-password", async (req, res) => {
    const {email} = req.body;
    const user = await Client.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000;
    await user.save();
    
    const resetLink = `${process.env.FRONTEND_URLSingle}/reset-password/${resetToken}`;
    // const resetLink = `${process.env.CLient_FRONTEND_URL}/reset-password/${resetToken}`;
    sendEmail( email,
         "Password Reset Request",
        `<p>Click the link to reset your password: <a href="${resetLink}" target="_blank">${resetLink}</a></p>`
    );
    res.json({ message: "Password reset email sent" });
});

// Reset Password
router.post("/reset-password", async (req, res) => {
    const { token, newPassword } = req.body;
    console.log(token)
    const user = await Client.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ message: "Invalid or expired token" });
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();
    res.json({ message: "Password reset successfully" });
});

router.post("/logout", (req, res) => {
    res.json({ message: "Logged out successfully" });
});


router.get("/me",authMiddleware, async (req, res) => {
  try {
    const user = await Client.findById(req.user.id).select("-password"); // Don't return password
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  });
  module.exports = router;