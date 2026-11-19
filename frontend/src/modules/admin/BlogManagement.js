import { Link } from "react-router-dom";

function BlogManagement() {
  return (
    <div className="admin-blog-management">
      <div className="admin-page-heading">
        <div>
          <h1>Blog Management</h1>
          <p>Create, edit and manage your website blogs.</p>
        </div>

        <Link to="/admin/blogs/new" className="admin-primary-btn">
          + New Blog
        </Link>
      </div>

      <div className="admin-section-card">
        <div className="admin-empty-state">
          <h2>📝</h2>
          <h3>No blog data loaded yet</h3>
          <p>
            Your blog posts will appear here once MongoDB integration is
            complete.
          </p>

          <Link to="/admin/blogs/new" className="admin-primary-btn">
            Create Your First Blog
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogManagement;
