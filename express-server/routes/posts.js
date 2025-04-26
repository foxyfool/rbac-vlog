import express from "express";
import { body } from "express-validator";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { protect } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/role.js";

const router = express.Router();

router.get("/", getPosts);

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  [body("title").notEmpty(), body("content").notEmpty()],
  createPost
);
router.get("/:id", protect, authorizeRoles("admin"), getPosts);
router.put("/:id", protect, authorizeRoles("admin"), updatePost);
router.patch("/:id/patch", protect, authorizeRoles("admin"), updatePost);
router.delete("/:id", protect, authorizeRoles("admin"), deletePost);

export default router;
