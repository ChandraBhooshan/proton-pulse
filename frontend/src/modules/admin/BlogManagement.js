// import { Link } from "react-router-dom";

// function BlogManagement() {
//   return (
//     <div className="admin-blog-management">
//       <div className="admin-page-heading">
//         <div>
//           <h1>Blog Management</h1>
//           <p>Create, edit and manage your website blogs.</p>
//         </div>

//         <Link to="/admin/blogs/new" className="admin-primary-btn">
//           + New Blog
//         </Link>
//       </div>

//       <div className="admin-section-card">
//         <div className="admin-empty-state">
//           <h2>📝</h2>
//           <h3>No blog data loaded yet</h3>
//           <p>
//             Your blog posts will appear here once MongoDB integration is
//             complete.
//           </p>

//           <Link to="/admin/blogs/new" className="admin-primary-btn">
//             Create Your First Blog
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BlogManagement;

import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../../config.js";

function BlogManagement() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getToken = () => localStorage.getItem("token");

  //   const fetchBlogs = useCallback(async () => {
  //     const token = getToken();

  //     if (!token) {
  //       navigate(
  //         `/signup-login/login?redirect=${encodeURIComponent("/admin/blogs")}`,
  //         { replace: true },
  //       );
  //       return;
  //     }

  //     try {
  //       setLoading(true);
  //       setError("");

  //       const response = await fetch(`${API_URL}/api/blogs/admin/all`, {
  //         headers: {
  //           Authorization: token,
  //         },
  //       });

  //       const data = await response.json();
  //       const handleAuthError = (status) => {
  //         if (status === 401) {
  //           localStorage.removeItem("token");
  //           localStorage.removeItem("loggedInUser");

  //           navigate(
  //             `/signup-login/login?redirect=${encodeURIComponent("/admin/blogs")}`,
  //             { replace: true },
  //           );

  //           return true;
  //         }

  //         if (status === 403) {
  //           setError(
  //             "Admin access required. Your account may not have admin permissions.",
  //           );
  //           return true;
  //         }

  //         return false;
  //       };

  //       if (handleAuthError(response.status)) return;

  //       if (!response.ok) {
  //         throw new Error(data.message || "Unable to fetch blogs.");
  //       }

  //       setBlogs(data.blogs || []);
  //     } catch (err) {
  //       console.error("Fetch blogs error:", err);
  //       setError(err.message || "Something went wrong.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }, [navigate]);

  const fetchBlogs = useCallback(async () => {
    const token = getToken();

    if (!token) {
      navigate(
        `/signup-login/login?redirect=${encodeURIComponent("/admin/blogs")}`,
        { replace: true },
      );
      return;
    }

    const handleAuthError = (status) => {
      if (status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");

        navigate(
          `/signup-login/login?redirect=${encodeURIComponent("/admin/blogs")}`,
          { replace: true },
        );

        return true;
      }

      if (status === 403) {
        setError(
          "Admin access required. Your account may not have admin permissions.",
        );
        return true;
      }

      return false;
    };

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/blogs/admin/all`, {
        headers: {
          Authorization: token,
        },
      });

      const data = await response.json();

      if (handleAuthError(response.status)) return;

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch blogs.");
      }

      setBlogs(data.blogs || []);
    } catch (err) {
      console.error("Fetch blogs error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleStatusChange = async (blog) => {
    const newStatus = blog.status === "published" ? "draft" : "published";

    const confirmed = window.confirm(
      `Are you sure you want to ${newStatus === "published" ? "publish" : "unpublish"} this blog?`,
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/api/blogs/${blog._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (handleAuthError(response.status)) return;

      if (!response.ok) {
        throw new Error(data.message || "Unable to update blog.");
      }

      await fetchBlogs();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (blog) => {
    const confirmed = window.confirm(`Delete "${blog.title}" permanently?`);

    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/api/blogs/${blog._id}`, {
        method: "DELETE",
        headers: {
          Authorization: getToken(),
        },
      });

      const data = await response.json();

      if (handleAuthError(response.status)) return;

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete blog.");
      }

      setBlogs((prev) => prev.filter((item) => item._id !== blog._id));
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.category.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "all" || blog.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="admin-blog-management">
      <div className="admin-page-heading">
        <div>
          <h1>Blog Management</h1>
          <p>Manage your website's blog posts.</p>
        </div>

        <Link to="/admin/blogs/new" className="admin-primary-btn">
          + New Blog
        </Link>
      </div>

      <div className="admin-blog-toolbar">
        <input
          type="search"
          placeholder="Search blogs by title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Blogs</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
        </select>

        <button
          className="admin-secondary-btn"
          onClick={fetchBlogs}
          disabled={loading}
        >
          Refresh
        </button>
      </div>

      <div className="admin-blog-counts">
        <span>Total: {blogs.length}</span>
        <span>
          Published: {blogs.filter((b) => b.status === "published").length}
        </span>
        <span>Drafts: {blogs.filter((b) => b.status === "draft").length}</span>
      </div>

      <div className="admin-section-card">
        {loading ? (
          <p>Loading blogs...</p>
        ) : error ? (
          <div className="admin-error">
            <p>{error}</p>
            <button className="admin-secondary-btn" onClick={fetchBlogs}>
              Try Again
            </button>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="admin-empty-state">
            <h2>📝</h2>
            <h3>No blogs found</h3>
            <p>Create a blog or change your search filters.</p>
            <Link to="/admin/blogs/new" className="admin-primary-btn">
              Create Blog
            </Link>
          </div>
        ) : (
          <div className="admin-blog-table-wrapper">
            <table className="admin-blog-table">
              <thead>
                <tr>
                  <th>Blog</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredBlogs.map((blog) => (
                  <tr key={blog._id}>
                    <td>
                      <strong>{blog.title}</strong>
                      <small>/{blog.slug}</small>
                    </td>

                    <td>{blog.category}</td>

                    <td>
                      <span className={`admin-status ${blog.status}`}>
                        {blog.status}
                      </span>
                    </td>

                    <td>{new Date(blog.updatedAt).toLocaleDateString()}</td>

                    <td>
                      <div className="admin-blog-actions">
                        <button
                          onClick={() =>
                            navigate(`/admin/blogs/edit/${blog._id}`)
                          }
                        >
                          Edit
                        </button>

                        <button onClick={() => handleStatusChange(blog)}>
                          {blog.status === "published"
                            ? "Unpublish"
                            : "Publish"}
                        </button>

                        <button
                          className="admin-delete-btn"
                          onClick={() => handleDelete(blog)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogManagement;
