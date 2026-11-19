import { NavLink, Outlet } from "react-router-dom";
import "./Admin.css";

function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h2>ProtonPulse</h2>
          <span>ADMIN PANEL</span>
        </div>

        <nav className="admin-nav">
          <p className="admin-nav-heading">MAIN MENU</p>

          <NavLink to="/admin" end>
            <span>▦</span> Dashboard
          </NavLink>

          <NavLink to="/admin/blogs">
            <span>▤</span> Blogs
          </NavLink>

          <NavLink to="/admin/blogs/new">
            <span>＋</span> Create Blog
          </NavLink>

          <p className="admin-nav-heading">MANAGEMENT</p>

          <NavLink to="/admin/quiz">
            <span>☷</span> Quiz Questions
          </NavLink>

          <NavLink to="/admin/users">
            <span>♙</span> Users
          </NavLink>

          <NavLink to="/admin/newsletter">
            <span>✉</span> Newsletter
          </NavLink>

          <NavLink to="/admin/media">
            <span>▧</span> Media Library
          </NavLink>

          <p className="admin-nav-heading">SYSTEM</p>

          <NavLink to="/admin/settings">
            <span>⚙</span> Settings
          </NavLink>
        </nav>

        <div className="admin-sidebar-footer">
          <p>ProtonPulse</p>
          <small>Content Management System</small>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <h3>Administration</h3>
            <p>Manage your website content</p>
          </div>

          <div className="admin-profile">
            <span>Admin</span>
            <div className="admin-avatar">A</div>
          </div>
        </header>

        <section className="admin-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default AdminLayout;
