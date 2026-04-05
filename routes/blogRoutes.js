import { Router } from "express";
import {
  getAllBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

const router = Router();

router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getBlog);
router.post("/blogs", createBlog);
router.put("/blogs/:id", updateBlog);
router.delete("/blogs/:id", deleteBlog);

export default router;
