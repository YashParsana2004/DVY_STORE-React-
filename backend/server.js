import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs"; // Added for password hashing
import User from "./models/userModel.js";
import jwt from "jsonwebtoken";
import authRoutes from "./routes/authRoutes.js";
/* global process */

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Use environment variable for port

// Enhanced middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

app.use("/api", authRoutes); 

// MongoDB connection with improved error handling
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/signupDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  }
};
connectDB();

// Email sender utility with improved error handling
const sendEmail = async (email, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"DYV_Store" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html: htmlContent,
    });
  } catch (err) {
    console.error("❌ Email sending error:", err);
    throw new Error("Failed to send email");
  }
};

// Signup Route with password hashing
app.post("/api/signup", async (req, res) => {
  try {
    const { fullname, email, password, address, birthDate, phone } = req.body;

    // Input validation
    if (!email || !password || !fullname) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email already exists" });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      address,
      birthDate,
      phone,
      isVerified: false,
      verificationToken,
    });

    await newUser.save();
    
    const verificationLink = `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/verify/${verificationToken}`;
    const emailHtml = `<h3>Click the link below to verify your email:</h3>
                      <a href="${verificationLink}">${verificationLink}</a>
                      <p>Thank You For Registering at DYV Store ♥</p>`;
    
    await sendEmail(email, "Verify Your Email", emailHtml);

    res.status(201).json({
      success: true,
      message: "User registered successfully. Please verify your email.",
    });
  } catch (error) {
    console.error("❌ Signup Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Email Verification Route
app.get("/api/verify/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).send("Invalid or expired verification link.");
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    // Redirect to frontend after successful verification
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?verified=true`);
  } catch (err) {
    console.error("❌ Verification Error:", err);
    res.status(500).send("Server error");
  }
});

// Login Route with password comparison
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ success: false, message: "Please verify your email first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Create JWT token for authentication
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// Admin route with authentication check
app.get("/api/admin/users", async (req, res) => {
  try {
    // In a real app, you would verify admin privileges here
    const users = await User.find({}, "-password -verificationToken");
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("❌ Admin Fetch Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Password reset routes
app.post("/api/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if user doesn't exist for security
      return res.status(200).json({ success: true, message: "If the email exists, a reset link has been sent" });
    }

    const resetToken = jwt.sign(
      { id: user._id },
      process.env.RESET_PASSWORD_SECRET || 'reset-secret-key',
      { expiresIn: "15m" }
    );

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 900000; // 15 minutes
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;
    const emailHtml = `<h3>Password Reset Request</h3>
                      <p>Click below to reset your password (valid for 15 minutes):</p>
                      <a href="${resetLink}">${resetLink}</a>`;

    await sendEmail(user.email, "Reset Your Password", emailHtml);

    res.status(200).json({ success: true, message: "Password reset link sent to your email." });
  } catch (err) {
    console.error("❌ Forgot Password Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Add this route for actual password reset
app.post("/api/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({ success: false, message: "New password is required" });
    }

    const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET || 'reset-secret-key');
    const user = await User.findOne({
      _id: decoded.id,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    console.error("❌ Reset Password Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Error handling middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
  console.error("❌ Unhandled Error:", err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server running at ${process.env.BACKEND_URL || `http://localhost:${PORT}`}`);
});