import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
/* global process */

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"DYV Store" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw new Error("Email sending failed");
  }
};

export default sendEmail;
