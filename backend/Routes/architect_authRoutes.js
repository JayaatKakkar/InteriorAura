const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Architect = require("../Models/Architect");
const crypto = require("crypto");
const router = express.Router();
const authMiddleware = require("../middleware/architect_authMiddleware");
const sendEmail = require("../utils/architect_SendEmail");

// Signup
router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const { name, email } = req.body;
    const mobile_no = Number(req.body.mobile_no);

    // Check if user already exists
    let user = await Architect.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Generate a random password
    const generatedPassword = crypto.randomBytes(6).toString("hex");

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    // Create new user with default status "pending"
    user = new Architect({
      name,
      email,
      mobile_no,
      password: hashedPassword,
      status: "pending"
    });
    await user.save();

    // Send the password via email
    await sendEmail(email, "Your Account Credentials", `Your password: ${generatedPassword}`);

    res.status(201).json({ message: "User registered. Check your email for login credentials." });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await Architect.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid User" });

  // ✅ Check if user is approved
  if (user.status !== "approved") {
    return res.status(403).json({ message: "Your account is not approved by admin yet." });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      status: user.status
    }
  });
});

// Get all architects (secured)
router.get("/architects", authMiddleware, async (req, res) => {
  try {
    const architects = await Architect.find().select("-password");
    res.json(architects);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get architect by ID (secured)
router.get("/architect/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const architect = await Architect.findById(id).select("-password");
    if (!architect) return res.status(404).json({ message: "Architect not found" });
    res.json(architect);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Change Password (secured)
router.post("/change-password", authMiddleware, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Architect.findById(req.user.id);
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) return res.status(400).json({ message: "Incorrect old password" });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ message: "Password changed successfully" });
});

// Forgot Password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await Architect.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetToken = resetToken;
  user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
  await user.save();

  // const resetLink = `${process.env.Architect_FRONTEND_URL}/reset-password/${resetToken}`;
  const resetLink = `${process.env.FRONTEND_URLSingle}/reset-password/${resetToken}`;
  await sendEmail(
    email,
    "Password Reset Request",
    `<p>Click the link to reset your password: <a href="${resetLink}" target="_blank">${resetLink}</a></p>`
  );

  res.json({ message: "Password reset email sent" });
});

// Reset Password
router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;
  const user = await Architect.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!user) return res.status(400).json({ message: "Invalid or expired token" });

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  res.json({ message: "Password reset successfully" });
});

// Logout (client should just delete token)
router.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});

// Get current logged-in user's data (secured)
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await Architect.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin: Get all architects (for dashboard, renamed from duplicate /register route)
router.get("/architects/all", async (req, res) => {
  try {
    const architects = await Architect.find().select("-password");
    res.status(200).json(architects);
  } catch (error) {
    console.error("Error fetching architects:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// Update Architect Status (Approve / Reject)
// router.put("/status/:id", async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   if (!["approved", "denied", "pending"].includes(status)) {
//     return res.status(400).json({ message: "Invalid status" });
//   }

//   try {
//     const updated = await Architect.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ message: "Architect not found" });
//     }

//     res.json({ message: `Architect status updated to ${status}` });
//   } catch (err) {
//     console.error("Error updating architect status:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// Update Architect Status (Approve / Reject with email notification)
router.put("/status/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["approved", "denied", "pending", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const architect = await Architect.findById(id);
    if (!architect) {
      return res.status(404).json({ message: "Architect not found" });
    }

    architect.status = status;
    await architect.save();

    // Prepare email message
    const subject = `Architect Account ${status === 'approved' ? 'Approved' : 'Rejected'}`;
    const message = `
      <p>Dear ${architect.name},</p>
      <p>Your architect registration has been <strong>${status}</strong>.</p>
      <p>Thank you for using our platform.</p>
    `;

    // Send email
    await sendEmail(architect.email, subject, message);

    res.json({ message: `Architect status updated to ${status} and email sent.` });
  } catch (err) {
    console.error("Error updating architect status:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// });


module.exports = router;
