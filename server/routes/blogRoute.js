import express from "express";
import {
  deleteBlog,
  editBlog,
  getAllBlogs,
  getBlogById,
  getBlogsByCategory,
  getBlogsByTag,
  postBlog,
} from "../controllers/blogController.js";
const router = express.Router();

router.post("/", postBlog);
router.get("/:id", getBlogById);
router.get("/", getAllBlogs);
router.put("/:id", editBlog);
router.delete("/:id", deleteBlog);
// searching by category and tag
router.get("/search-category/:categoryId", getBlogsByCategory);
router.get("/search-tag/:tag", getBlogsByTag);

export default router;
