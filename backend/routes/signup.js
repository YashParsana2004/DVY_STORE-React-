import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    console.log("✅ User saved successfully!");
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("❌ Error saving user:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
