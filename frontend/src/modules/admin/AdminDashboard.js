import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <div className="admin-page-heading">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome to ProtonPulse administration.</p>
        </div>

        <Link to="/admin/blogs/new" className="admin-primary-btn">
          + Create Blog
        </Link>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <span>Total Blogs</span>
          <h2>--</h2>
          <small>Blog statistics coming soon</small>
        </div>

        <div className="admin-stat-card">
          <span>Published Blogs</span>
          <h2>--</h2>
          <small>Published content</small>
        </div>

        <div className="admin-stat-card">
          <span>Quiz Questions</span>
          <h2>--</h2>
          <small>Question bank</small>
        </div>

        <div className="admin-stat-card">
          <span>Registered Users</span>
          <h2>--</h2>
          <small>User statistics</small>
        </div>
      </div>

      <div className="admin-section-card">
        <h2>Quick Actions</h2>

        <div className="admin-quick-actions">
          <Link to="/admin/blogs/new">
            <span>✍️</span>
            <div>
              <h3>Write a Blog</h3>
              <p>Create and publish a new article.</p>
            </div>
          </Link>

          <Link to="/admin/blogs">
            <span>📚</span>
            <div>
              <h3>Manage Blogs</h3>
              <p>Edit or manage existing articles.</p>
            </div>
          </Link>

          <Link to="/admin/quiz">
            <span>📝</span>
            <div>
              <h3>Manage Quiz</h3>
              <p>Add questions to your question bank.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
