import { Router } from "express";
import {
  getAllBlogs,
  getBlog,
  createBlog,
  updateBlog,
  likeBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import { userExtractor } from "../utils/middleware.js";

const router = Router();

router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getBlog);
router.post("/blogs", userExtractor, createBlog);
router.put("/blogs/:id", userExtractor, updateBlog);
router.patch("/blogs/:id/like", userExtractor, likeBlog);
router.delete("/blogs/:id", userExtractor, deleteBlog);

export default router;
