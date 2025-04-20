import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  address: String,
  birthDate: String,
  phone: String,
  isVerified: Boolean,
  verificationToken: String,
  isBlocked: { type: Boolean, default: false }, // ✅ New field
  createdAt: { type: Date, default: Date.now }, // ✅ "Member Since"
});

const User = mongoose.model("User", userSchema);
export default User;
