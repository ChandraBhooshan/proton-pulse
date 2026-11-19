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

router.get("/admin/verify", ensureAdmin, (req, res) => {
  return res.status(200).json({
    success: true,
    user: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

router.get("/:slug", getBlogBySlug);

// Admin-only routes
router.post("/", ensureAdmin, createBlog);
router.get("/admin/all", ensureAdmin, getAllBlogs);
router.put("/:id", ensureAdmin, updateBlog);
router.delete("/:id", ensureAdmin, deleteBlog);

module.exports = router;
