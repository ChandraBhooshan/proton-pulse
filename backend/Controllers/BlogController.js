const mongoose = require("mongoose");
const BlogPost = require("../Models/BlogPost");

// Create a new blog
const createBlog = async (req, res) => {
  try {
    const {
      title,
      slug,
      category,
      description,
      content,
      featuredImage,
      status,
      seoTitle,
      metaDescription,
    } = req.body;

    if (!title || !slug || !category || !description || !content) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required blog fields.",
      });
    }

    const normalizedSlug = slug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-|-$/g, "");

    if (!normalizedSlug) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid URL slug.",
      });
    }

    const existingBlog = await BlogPost.findOne({
      slug: normalizedSlug,
    });

    if (existingBlog) {
      return res.status(409).json({
        success: false,
        message: "This blog URL slug already exists.",
      });
    }

    const blogStatus = status === "published" ? "published" : "draft";

    const blog = await BlogPost.create({
      title,
      slug: normalizedSlug,
      author: req.user.name,
      authorId: req.user._id,
      category,
      description,
      content,
      featuredImage: featuredImage || "",
      status: blogStatus,
      seoTitle: seoTitle || "",
      metaDescription: metaDescription || "",
      publishedAt: blogStatus === "published" ? new Date() : null,
    });

    return res.status(201).json({
      success: true,
      message:
        blogStatus === "published"
          ? "Blog published successfully."
          : "Blog saved as draft.",
      blog,
    });
  } catch (error) {
    console.error("Create blog error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create blog.",
    });
  }
};

// Get all published blogs (public)
const getPublishedBlogs = async (req, res) => {
  try {
    const blogs = await BlogPost.find({
      status: "published",
    })
      .select("-content")
      .sort({ publishedAt: -1 });

    return res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.error("Fetch published blogs error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch blogs.",
    });
  }
};

// Get one published blog by slug (public)
const getBlogBySlug = async (req, res) => {
  try {
    const blog = await BlogPost.findOne({
      slug: req.params.slug,
      status: "published",
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    return res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error("Fetch blog error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch blog.",
    });
  }
};

// Get all blogs, including drafts (admin)
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogPost.find().sort({ updatedAt: -1 });

    return res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.error("Fetch admin blogs error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch blogs.",
    });
  }
};

// Update a blog (admin)
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID.",
      });
    }

    const blog = await BlogPost.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    const {
      title,
      slug,
      category,
      description,
      content,
      featuredImage,
      status,
      seoTitle,
      metaDescription,
    } = req.body;

    if (slug !== undefined) {
      const normalizedSlug = slug
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9-]+/g, "-")
        .replace(/^-|-$/g, "");

      if (!normalizedSlug) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid URL slug.",
        });
      }

      const duplicate = await BlogPost.findOne({
        slug: normalizedSlug,
        _id: { $ne: id },
      });

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: "This blog URL slug already exists.",
        });
      }

      blog.slug = normalizedSlug;
    }

    if (title !== undefined) blog.title = title;
    if (category !== undefined) blog.category = category;
    if (description !== undefined) blog.description = description;
    if (content !== undefined) blog.content = content;
    if (featuredImage !== undefined) blog.featuredImage = featuredImage;
    if (seoTitle !== undefined) blog.seoTitle = seoTitle;
    if (metaDescription !== undefined) blog.metaDescription = metaDescription;

    if (status !== undefined) {
      if (!["draft", "published"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid blog status.",
        });
      }

      if (status === "published" && blog.status !== "published") {
        blog.publishedAt = new Date();
      }

      if (status === "draft") {
        blog.publishedAt = null;
      }

      blog.status = status;
    }

    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully.",
      blog,
    });
  } catch (error) {
    console.error("Update blog error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update blog.",
    });
  }
};

// Delete a blog (admin)
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID.",
      });
    }

    const blog = await BlogPost.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully.",
    });
  } catch (error) {
    console.error("Delete blog error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete blog.",
    });
  }
};

module.exports = {
  createBlog,
  getPublishedBlogs,
  getBlogBySlug,
  getAllBlogs,
  updateBlog,
  deleteBlog,
};
