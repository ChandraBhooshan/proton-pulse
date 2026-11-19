const express = require("express");
const router = express.Router();

const ensureAdmin = require("../Middlewares/AdminAuth");

const {
  createBlog,
  getPublishedBlogs,
  getBlogBySlug,
  getAllBlogs,
  updateBlog,
  deleteBlog,
} = require("../Controllers/BlogController");

// Public routes
router.get("/", getPublishedBlogs);
router.get("/:slug", getBlogBySlug);

// Admin-only routes
router.post("/", ensureAdmin, createBlog);
router.get("/admin/all", ensureAdmin, getAllBlogs);
router.put("/:id", ensureAdmin, updateBlog);
router.delete("/:id", ensureAdmin, deleteBlog);

module.exports = router;
