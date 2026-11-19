// import { useState } from "react";

// function BlogEditor() {
//   const [blog, setBlog] = useState({
//     title: "",
//     slug: "",
//     category: "",
//     description: "",
//     content: "",
//     seoTitle: "",
//     metaDescription: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setBlog((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     if (name === "title") {
//       setBlog((prev) => ({
//         ...prev,
//         slug: value
//           .toLowerCase()
//           .trim()
//           .replace(/[^a-z0-9]+/g, "-")
//           .replace(/^-|-$/g, ""),
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     alert("Blog editor UI is ready. Backend integration is next.");
//   };

//   return (
//     <div className="admin-blog-editor">
//       <div className="admin-page-heading">
//         <div>
//           <h1>Create Blog</h1>
//           <p>Write and prepare a new blog post.</p>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className="admin-section-card">
//         <div className="admin-form-group">
//           <label>Blog Title</label>
//           <input
//             name="title"
//             value={blog.title}
//             onChange={handleChange}
//             placeholder="Enter blog title"
//             required
//           />
//         </div>

//         <div className="admin-form-group">
//           <label>URL Slug</label>
//           <input
//             name="slug"
//             value={blog.slug}
//             onChange={handleChange}
//             placeholder="blog-url-slug"
//             required
//           />
//         </div>

//         <div className="admin-form-group">
//           <label>Category</label>
//           <select
//             name="category"
//             value={blog.category}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select category</option>
//             <option value="Programming">Programming</option>
//             <option value="Technology">Technology</option>
//             <option value="AI and ML">AI and ML</option>
//             <option value="Computer Science">Computer Science</option>
//             <option value="Tutorials">Tutorials</option>
//           </select>
//         </div>

//         <div className="admin-form-group">
//           <label>Short Description</label>
//           <textarea
//             name="description"
//             value={blog.description}
//             onChange={handleChange}
//             placeholder="Write a short introduction..."
//             rows="3"
//             required
//           />
//         </div>

//         <div className="admin-form-group">
//           <label>Blog Content</label>
//           <textarea
//             name="content"
//             value={blog.content}
//             onChange={handleChange}
//             placeholder="Write your complete blog content..."
//             rows="14"
//             required
//           />
//         </div>

//         <h3>SEO Settings</h3>

//         <div className="admin-form-group">
//           <label>SEO Title</label>
//           <input
//             name="seoTitle"
//             value={blog.seoTitle}
//             onChange={handleChange}
//             placeholder="SEO title"
//           />
//         </div>

//         <div className="admin-form-group">
//           <label>Meta Description</label>
//           <textarea
//             name="metaDescription"
//             value={blog.metaDescription}
//             onChange={handleChange}
//             placeholder="SEO meta description"
//             rows="3"
//           />
//         </div>

//         <div className="admin-editor-actions">
//           <button type="button" className="admin-secondary-btn">
//             Save Draft
//           </button>

//           <button type="submit" className="admin-primary-btn">
//             Publish Blog
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default BlogEditor;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../config.js";

function BlogEditor() {
  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    title: "",
    slug: "",
    category: "",
    description: "",
    content: "",
    featuredImage: "",
    seoTitle: "",
    metaDescription: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setBlog((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "title" && !prev.slug
        ? {
            slug: value
              .toLowerCase()
              .trim()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, ""),
          }
        : {}),
    }));
  };

  // Save blog as draft or publish it
  const handleSave = async (status) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate(
        `/signup-login/login?redirect=${encodeURIComponent("/admin/blogs/new")}`,
        { replace: true },
      );
      return;
    }

    if (
      !blog.title.trim() ||
      !blog.slug.trim() ||
      !blog.category ||
      !blog.description.trim() ||
      !blog.content.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          ...blog,
          status,
        }),
      });

      const result = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");

        alert("Your session has expired. Please log in again.");

        navigate(
          `/signup-login/login?redirect=${encodeURIComponent("/admin/blogs/new")}`,
          { replace: true },
        );
        return;
      }

      if (response.status === 403) {
        alert(result.message || "Admin access required.");
        return;
      }

      if (!response.ok) {
        throw new Error(result.message || "Unable to save blog.");
      }

      alert(result.message || "Blog saved successfully.");

      navigate("/admin/blogs");
    } catch (error) {
      console.error("Blog save error:", error);
      alert(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-blog-editor">
      <div className="admin-page-heading">
        <div>
          <h1>Create Blog</h1>
          <p>Write and publish a new article.</p>
        </div>
      </div>

      <form className="admin-section-card" onSubmit={(e) => e.preventDefault()}>
        <div className="admin-form-group">
          <label>Blog Title *</label>
          <input
            name="title"
            value={blog.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            required
          />
        </div>

        <div className="admin-form-group">
          <label>URL Slug *</label>
          <input
            name="slug"
            value={blog.slug}
            onChange={handleChange}
            placeholder="blog-url-slug"
            required
          />
        </div>

        <div className="admin-form-group">
          <label>Category *</label>
          <select
            name="category"
            value={blog.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            <option value="Programming">Programming</option>
            <option value="Technology">Technology</option>
            <option value="AI and ML">AI and ML</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Tutorials">Tutorials</option>
          </select>
        </div>

        <div className="admin-form-group">
          <label>Short Description *</label>
          <textarea
            name="description"
            value={blog.description}
            onChange={handleChange}
            placeholder="Write a short introduction..."
            rows="3"
            required
          />
        </div>

        <div className="admin-form-group">
          <label>Featured Image URL</label>
          <input
            name="featuredImage"
            value={blog.featuredImage}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="admin-form-group">
          <label>Blog Content *</label>
          <textarea
            name="content"
            value={blog.content}
            onChange={handleChange}
            placeholder="Write your complete blog content..."
            rows="14"
            required
          />
        </div>

        <h3>SEO Settings</h3>

        <div className="admin-form-group">
          <label>SEO Title</label>
          <input
            name="seoTitle"
            value={blog.seoTitle}
            onChange={handleChange}
            placeholder="SEO title"
          />
        </div>

        <div className="admin-form-group">
          <label>Meta Description</label>
          <textarea
            name="metaDescription"
            value={blog.metaDescription}
            onChange={handleChange}
            placeholder="SEO meta description"
            rows="3"
          />
        </div>

        <div className="admin-editor-actions">
          <button
            type="button"
            className="admin-secondary-btn"
            disabled={loading}
            onClick={() => handleSave("draft")}
          >
            {loading ? "Saving..." : "Save Draft"}
          </button>

          <button
            type="button"
            className="admin-primary-btn"
            disabled={loading}
            onClick={() => handleSave("published")}
          >
            {loading ? "Processing..." : "Publish Blog"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BlogEditor;
