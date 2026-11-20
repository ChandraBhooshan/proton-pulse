// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { handleError, handleSuccess } from "./support-files/utils";
// import { ToastContainer } from "react-toastify";
// import "./signup-login.css";

// function LoginHome() {
//   const [loggedInUser, setLoggedInUser] = useState("");
//   const [products, setProducts] = useState("");
//   const navigate = useNavigate();
//   useEffect(() => {
//     setLoggedInUser(localStorage.getItem("loggedInUser"));
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("jwtToken");
//     localStorage.removeItem("loggedInUser");
//     localStorage.removeItem("user");
//     handleSuccess("User Logged out");

//     setTimeout(() => {
//       navigate("/work", { replace: true });
//     }, 1000);
//   };

//   const fetchProducts = async () => {
//     try {
//       // const url = "http://localhost:8080/products";
//       const url = `https://proton-pulse.vercel.app/signup-login/products`;
//       const headers = {
//         headers: {
//           Authorization: localStorage.getItem("token"),
//         },
//       };
//       const response = await fetch(url, headers);
//       const result = await response.json();
//       console.log(result);
//       setProducts(result);
//     } catch (err) {
//       handleError(err);
//     }
//   };
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <div>
//       <h1>Welcome {loggedInUser}</h1>
//       <button onClick={handleLogout}>Logout</button>
//       <div>
//         {products &&
//           products?.map((item, index) => (
//             <ul key={index}>
//               <span>
//                 {item.name} : {item.price}
//               </span>
//             </ul>
//           ))}
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }

// export default LoginHome;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "./support-files/utils";
import { ToastContainer } from "react-toastify";
import "./signup-login.css";

function LoginHome() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser") || "User");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("user");

    handleSuccess("User Logged out");

    setTimeout(() => {
      navigate("/work", { replace: true });
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = "https://proton-pulse.vercel.app/signup-login/products";

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error("Unable to fetch products.");
      }

      const result = await response.json();

      // Support an array response or common wrapped API responses.
      const productList = Array.isArray(result)
        ? result
        : Array.isArray(result.products)
          ? result.products
          : Array.isArray(result.data)
            ? result.data
            : [];

      setProducts(productList);
    } catch (err) {
      handleError(err.message || "Unable to load products.");
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="user-dashboard">
      {/* Welcome section */}
      <section className="dashboard-hero">
        <div className="hero-content">
          <span className="dashboard-eyebrow">PROTONPULSE PERSONAL SPACE</span>

          <h1>
            Welcome back,
            <br />
            <span>{loggedInUser}!</span>
          </h1>

          <p>
            Your personal workspace is ready. Explore your tools, manage your
            account, and discover what's available.
          </p>

          <div className="hero-actions">
            <button
              className="dashboard-primary-btn"
              onClick={() => navigate("/work")}
            >
              Explore Workspace
            </button>

            <button className="dashboard-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        <div className="hero-decoration">
          <div className="hero-circle">
            <span>PP</span>
          </div>
          <div className="hero-glow"></div>
        </div>
      </section>

      {/* Quick navigation */}
      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <div>
            <span className="section-eyebrow">GET STARTED</span>
            <h2>Quick Access</h2>
          </div>
          <p>Navigate through ProtonPulse</p>
        </div>

        <div className="dashboard-quick-grid">
          <button className="quick-card" onClick={() => navigate("/")}>
            <span className="quick-icon">⌂</span>
            <span className="quick-title">Home</span>
            <span className="quick-description">Visit the main website</span>
            <span className="quick-arrow">→</span>
          </button>

          <button className="quick-card" onClick={() => navigate("/about")}>
            <span className="quick-icon">◎</span>
            <span className="quick-title">About</span>
            <span className="quick-description">
              Learn more about ProtonPulse
            </span>
            <span className="quick-arrow">→</span>
          </button>

          <button className="quick-card" onClick={() => navigate("/work")}>
            <span className="quick-icon">⚡</span>
            <span className="quick-title">Workspace</span>
            <span className="quick-description">Explore available tools</span>
            <span className="quick-arrow">→</span>
          </button>

          <button className="quick-card" onClick={() => navigate("/blog")}>
            <span className="quick-icon">▤</span>
            <span className="quick-title">Blog</span>
            <span className="quick-description">Read articles and updates</span>
            <span className="quick-arrow">→</span>
          </button>
        </div>
      </section>

      {/* Products */}
      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <div>
            <span className="section-eyebrow">YOUR COLLECTION</span>
            <h2>Available Products</h2>
          </div>

          <span className="product-count">{products.length} Products</span>
        </div>

        {loadingProducts ? (
          <div className="dashboard-message">Loading your products...</div>
        ) : products.length > 0 ? (
          <div className="dashboard-product-grid">
            {products.map((item, index) => (
              <div className="dashboard-product-card" key={item._id || index}>
                <div className="product-card-icon">◇</div>

                <div className="product-card-info">
                  <h3>{item.name}</h3>
                  <p>Available in your collection</p>
                </div>

                <div className="product-price">
                  ₹{Number(item.price || 0).toLocaleString("en-IN")}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="dashboard-empty">
            <span className="empty-icon">◇</span>
            <h3>No products available</h3>
            <p>
              Your product collection is currently empty. New items will appear
              here when available.
            </p>
          </div>
        )}
      </section>

      {/* Account overview */}
      <section className="dashboard-account">
        <div>
          <span className="section-eyebrow">ACCOUNT</span>
          <h2>Your Account</h2>
          <p>You're signed in to your ProtonPulse account.</p>
        </div>

        <div className="account-user">
          <div className="account-avatar">
            {loggedInUser.charAt(0).toUpperCase()}
          </div>

          <div>
            <strong>{loggedInUser}</strong>
            <span>Logged-in user</span>
          </div>

          <span className="account-status">Active</span>
        </div>
      </section>

      <footer className="dashboard-footer">
        <span>© {new Date().getFullYear()} ProtonPulse</span>
        <span>Built to explore. Designed to create.</span>
      </footer>

      <ToastContainer />
    </main>
  );
}

export default LoginHome;
