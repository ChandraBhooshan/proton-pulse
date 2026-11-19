// import { NavLink, Outlet } from "react-router-dom";
// import "./Admin.css";

// function AdminLayout() {
//   return (
//     <div className="admin-layout">
//       <aside className="admin-sidebar">
//         <div className="admin-brand">
//           <h2>ProtonPulse</h2>
//           <span>ADMIN PANEL</span>
//         </div>

//         <nav className="admin-nav">
//           <p className="admin-nav-heading">MAIN MENU</p>

//           <NavLink to="/admin" end>
//             <span>▦</span> Dashboard
//           </NavLink>

//           <NavLink to="/admin/blogs">
//             <span>▤</span> Blogs
//           </NavLink>

//           <NavLink to="/admin/blogs/new">
//             <span>＋</span> Create Blog
//           </NavLink>

//           <p className="admin-nav-heading">MANAGEMENT</p>

//           <NavLink to="/admin/quiz">
//             <span>☷</span> Quiz Questions
//           </NavLink>

//           <NavLink to="/admin/users">
//             <span>♙</span> Users
//           </NavLink>

//           <NavLink to="/admin/newsletter">
//             <span>✉</span> Newsletter
//           </NavLink>

//           <NavLink to="/admin/media">
//             <span>▧</span> Media Library
//           </NavLink>

//           <p className="admin-nav-heading">SYSTEM</p>

//           <NavLink to="/admin/settings">
//             <span>⚙</span> Settings
//           </NavLink>
//         </nav>

//         <div className="admin-sidebar-footer">
//           <p>ProtonPulse</p>
//           <small>Content Management System</small>
//         </div>
//       </aside>

//       <main className="admin-main">
//         <header className="admin-topbar">
//           <div>
//             <h3>Administration</h3>
//             <p>Manage your website content</p>
//           </div>

//           <div className="admin-profile">
//             <span>Admin</span>
//             <div className="admin-avatar">A</div>
//           </div>
//         </header>

//         <section className="admin-content">
//           <Outlet />
//         </section>
//       </main>
//     </div>
//   );
// }

// export default AdminLayout;

import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import API_URL from "../../config.js";
import "./Admin.css";

function AdminLayout() {
  const navigate = useNavigate();

  const [checking, setChecking] = useState(true);
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState("");

  // Verify admin access with backend
  useEffect(() => {
    let isMounted = true;

    const verifyAdmin = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate(
          `/signup-login/login?redirect=${encodeURIComponent("/admin")}`,
          { replace: true },
        );
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/blogs/admin/verify`, {
          headers: {
            Authorization: token,
          },
        });

        const data = await response.json();

        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("loggedInUser");

          navigate(
            `/signup-login/login?redirect=${encodeURIComponent("/admin")}`,
            { replace: true },
          );
          return;
        }

        if (response.status === 403) {
          if (isMounted) {
            setError("Access denied. Admin permissions are required.");
          }
          return;
        }

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Admin verification failed.");
        }

        if (isMounted) {
          setAdmin(data.user);
        }
      } catch (err) {
        console.error("Admin verification error:", err);

        if (isMounted) {
          setError("Unable to verify admin access. Please try again.");
        }
      } finally {
        if (isMounted) {
          setChecking(false);
        }
      }
    };

    verifyAdmin();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  // Show verification screen
  if (checking) {
    return (
      <div className="admin-access-screen">
        <h2>Verifying access...</h2>
        <p>Please wait while we verify your account.</p>
      </div>
    );
  }

  // Show access denied or verification error
  if (error || !admin) {
    return (
      <div className="admin-access-screen">
        <h2>Access Restricted</h2>
        <p>{error || "You are not authorized to access this page."}</p>

        <button
          className="admin-primary-btn"
          onClick={() => navigate("/", { replace: true })}
        >
          Return to Home
        </button>
      </div>
    );
  }

  // Render admin dashboard only after verification
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
            <span>{admin.name}</span>
            <div className="admin-avatar">
              {admin.name?.charAt(0).toUpperCase() || "A"}
            </div>
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
