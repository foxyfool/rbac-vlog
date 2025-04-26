import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
import { validationResult } from "express-validator";
import { User } from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";

dotenv.config();

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });

  const { name, email, password, role } = req.body;

  if (!["user", "admin"].includes(role)) role = "user";

  const cleanEmail = email.toLowerCase().trim();

  try {
    if (await User.findOne({ email: cleanEmail }))
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email: cleanEmail, password, role });

    const token = crypto.randomBytes(32).toString("hex");
    user.verificationToken = token;
    user.verificationTokenExpires = Date.now() + 60 * 60 * 1000;
    await user.save();

    const verifyURL = `${process.env.BASE_URL}/verify/${token}`;
    await sendEmail({
      to: user.email,
      subject: "Verify your e‑mail",
      html: `<p>Hi ${user.name}, click <a href="${verifyURL}">here</a> to verify your account. This link expires in one hour.</p>`,
    });

    res.status(201).json({
      message: "Registration successful – please verify your e‑mail.",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({
    verificationToken: token,
    verificationTokenExpires: { $gt: Date.now() },
  });
  if (!user)
    return res.status(400).json({ message: "Token invalid or expired" });

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpires = undefined;
  await user.save();
  res.json({ message: "E‑mail verified! You can now log in." });
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });

  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    }).select("+password");
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: "Invalid credentials" });

    if (!user.isVerified)
      return res
        .status(401)
        .json({ message: "Please verify your e‑mail first." });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
