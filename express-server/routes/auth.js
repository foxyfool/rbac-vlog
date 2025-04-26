import express from "express";
import { body } from "express-validator";
import { register, login, verifyEmail } from "../controllers/authController.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid e‑mail is required"),
    body("password").isLength({ min: 6 }).withMessage("Password ≥6 chars"),
    body("role")
      .isIn(["user", "admin"])
      .withMessage("role must be user or admin"),
  ],
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid e‑mail is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);

router.get("/verify/:token", verifyEmail);

export default router;
