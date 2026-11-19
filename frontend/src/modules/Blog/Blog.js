// function Blog() {
//   const blogPosts = [
//     {
//       id: 1,
//       title: "Getting Started with Software",
//       author: "Buddy",
//       date: "May 26, 2026",
//       content:
//         "Software development is the process of designing, building, and maintaining software applications. It involves various stages from planning to deployment.",
//     },
//     {
//       id: 2,
//       title: "Why Software Engineering Matters",
//       author: "Buddy",
//       date: "May 24, 2026",
//       content:
//         "Software engineering principles help ensure that applications are well-structured, maintainable, and scalable.",
//     },
//   ];

//   return (
//     <div style={styles.container}>
//       <header style={styles.header}>
//         <h1 style={styles.title}>My React Blog</h1>
//         <p style={styles.subtitle}>
//           Learn React concepts with simple blog posts.
//         </p>
//       </header>

//       <main>
//         {blogPosts.map((post) => (
//           <div key={post.id} style={styles.card}>
//             <h2 style={styles.postTitle}>{post.title}</h2>

//             <div style={styles.meta}>
//               <span>By {post.author}</span>
//               <span>{post.date}</span>
//             </div>

//             <p style={styles.content}>{post.content}</p>

//             <button style={styles.button}>Read More</button>
//           </div>
//         ))}
//       </main>

//       <footer style={styles.footer}>
//         <p>© 2026 My React Blog. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     maxWidth: "900px",
//     margin: "0 auto",
//     padding: "20px",
//     fontFamily: "Arial, sans-serif",
//     backgroundColor: "#f5f5f5",
//     minHeight: "100vh",
//   },

//   header: {
//     textAlign: "center",
//     marginBottom: "40px",
//   },

//   title: {
//     fontSize: "42px",
//     color: "#222",
//     marginBottom: "10px",
//   },

//   subtitle: {
//     fontSize: "18px",
//     color: "#666",
//   },

//   card: {
//     backgroundColor: "#fff",
//     padding: "20px",
//     borderRadius: "10px",
//     marginBottom: "25px",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//   },

//   postTitle: {
//     marginBottom: "10px",
//     color: "#333",
//   },

//   meta: {
//     display: "flex",
//     justifyContent: "space-between",
//     fontSize: "14px",
//     color: "#777",
//     marginBottom: "15px",
//   },

//   content: {
//     lineHeight: "1.7",
//     color: "#444",
//   },

//   button: {
//     marginTop: "15px",
//     padding: "10px 18px",
//     border: "none",
//     borderRadius: "5px",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     cursor: "pointer",
//     fontSize: "14px",
//   },

//   footer: {
//     textAlign: "center",
//     marginTop: "40px",
//     color: "#777",
//     fontSize: "14px",
//   },
// };

// export default Blog;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../../config";

function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch published blogs from backend
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/blogs`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load blogs.");
      }

      setBlogPosts(data.blogs || []);
    } catch (err) {
      console.error("Fetch blogs error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Format publication date
  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div style={styles.container}>
      {/* <header style={styles.header}>
        <h1 style={styles.title}>My React Blog</h1>
        <p style={styles.subtitle}>
          Learn React concepts with simple blog posts.
        </p>
      </header> */}

      <main>
        {loading && <p style={styles.message}>Loading blogs...</p>}

        {!loading && error && (
          <div style={styles.error}>
            <p>{error}</p>
            <button style={styles.button} onClick={fetchBlogs}>
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && blogPosts.length === 0 && (
          <p style={styles.message}>No published blogs available yet.</p>
        )}

        {!loading &&
          !error &&
          blogPosts.map((post) => (
            <article key={post._id} style={styles.card}>
              <h2 style={styles.postTitle}>{post.title}</h2>

              <div style={styles.meta}>
                <span>By {post.author}</span>
                <span>{formatDate(post.publishedAt)}</span>
              </div>

              <p style={styles.category}>{post.category}</p>

              <p style={styles.content}>{post.description}</p>

              <Link to={`/blog/${post.slug}`} style={styles.button}>
                Read More
              </Link>
            </article>
          ))}
      </main>

      <footer style={styles.footer}>
        <p>© 2026 My React Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  },

  header: {
    textAlign: "center",
    marginBottom: "40px",
  },

  title: {
    fontSize: "42px",
    color: "#222",
    marginBottom: "10px",
  },

  subtitle: {
    fontSize: "18px",
    color: "#666",
  },

  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "25px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  postTitle: {
    marginBottom: "10px",
    color: "#333",
  },

  meta: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "8px",
    fontSize: "14px",
    color: "#777",
    marginBottom: "15px",
  },

  category: {
    display: "inline-block",
    backgroundColor: "#e8f1ff",
    color: "#007bff",
    padding: "5px 10px",
    borderRadius: "4px",
    fontSize: "13px",
  },

  content: {
    lineHeight: "1.7",
    color: "#444",
  },

  button: {
    display: "inline-block",
    marginTop: "15px",
    padding: "10px 18px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    textDecoration: "none",
  },

  message: {
    textAlign: "center",
    padding: "30px",
    color: "#666",
  },

  error: {
    textAlign: "center",
    padding: "20px",
    color: "#dc3545",
  },

  footer: {
    textAlign: "center",
    marginTop: "40px",
    color: "#777",
    fontSize: "14px",
  },
};

export default Blog;
