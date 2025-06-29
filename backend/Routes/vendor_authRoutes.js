// routes/authRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Vendor = require("../Models/Vendor");
const crypto = require("crypto");
const router = express.Router();
const authMiddleware = require("../middleware/vendor_authMiddleware");
const sendEmail = require("../utils/vendor_SendEmail");

// Signup
router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const { name, email } = req.body;
    const mobile_no = Number(req.body.mobile_no);

    // Check if user already exists
    let user = await Vendor.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Generate a random password
    const generatedPassword = crypto.randomBytes(6).toString("hex");

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    // Create new user
    user = new Vendor({
      name,
      email,
      mobile_no,
      password: hashedPassword,
      status: "pending",
    });
    await user.save();

    // Send the password via email
    await sendEmail(
      email,
      "Your Account Credentials",
      `Your password: ${generatedPassword}`
    );

    res.status(201).json({ message: "User registered. Check your email for login credentials." });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Vendor.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Check if user is approved
    if (user.status !== "approved") {
      return res.status(403).json({ message: "Your account is not approved by admin yet." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Protected - Get all vendors (excluding passwords)
router.get("/vendors", authMiddleware, async (req, res) => {
  try {
    const vendors = await Vendor.find().select("-password");
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Public - Get all vendors (for admin or list view)
router.get("/vendors/all", async (req, res) => {
  try {
    const vendors = await Vendor.find().select("-password");
    res.status(200).json(vendors);
  } catch (error) {
    console.error("Error fetching vendors:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get vendor by ID (protected)
router.get("/vendor/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const vendor = await Vendor.findById(id).select("-password");
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.json(vendor);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Change Password (protected)
router.post("/change-password", authMiddleware, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await Vendor.findById(req.user.id);
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect old password" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Forgot Password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Vendor.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();

    // const resetLink = `${process.env.Vendor_FRONTEND_URL}/reset-password/${resetToken}`;
    const resetLink = `${process.env.FRONTEND_URLSingle}/reset-password/${resetToken}`;
    await sendEmail(
      email,
      "Password Reset Request",
      `<p>Click the link to reset your password: <a href="${resetLink}" target="_blank">${resetLink}</a></p>`
    );

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Reset Password
router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const user = await Vendor.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Logout
router.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});

// Get current user info (protected)
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await Vendor.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update vendor status
router.put("/status/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["approved", "rejected", "pending"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const updated = await Vendor.findByIdAndUpdate(id, { status }, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    // Send status update email
    await sendEmail(
      updated.email,
      "Vendor Account Status Update",
      `Hello ${updated.name},<br>Your account has been <strong>${status.toUpperCase()}</strong> by Admin.
       <p>Thank you for using our platform.</p>`
    );

    res.json({ message: `Vendor status updated to ${status}` });
  } catch (err) {
    console.error("Error updating vendor status:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
