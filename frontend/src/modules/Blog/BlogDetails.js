import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API_URL from "../../config";

function BlogDetails() {
  const { slug } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError("");
        setBlog(null);

        const response = await fetch(
          `${API_URL}/api/blogs/${encodeURIComponent(slug)}`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load blog.");
        }

        setBlog(data.blog);
      } catch (err) {
        console.error("Fetch blog details error:", err);
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return <div style={styles.message}>Loading article...</div>;
  }

  if (error || !blog) {
    return (
      <div style={styles.message}>
        <h2>Blog not found</h2>
        <p>{error || "This article may have been removed."}</p>
        <Link to="/blog">Back to Blogs</Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Link to="/blog" style={styles.backLink}>
        ← Back to Blogs
      </Link>

      <article style={styles.article}>
        {blog.featuredImage && (
          <img src={blog.featuredImage} alt={blog.title} style={styles.image} />
        )}

        <p style={styles.category}>{blog.category}</p>

        <h1 style={styles.title}>{blog.title}</h1>

        <div style={styles.meta}>
          <span>By {blog.author}</span>
          <span>{formatDate(blog.publishedAt)}</span>
        </div>

        <p style={styles.description}>{blog.description}</p>

        <div style={styles.content}>{blog.content}</div>
      </article>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "25px 20px",
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
  },

  backLink: {
    display: "inline-block",
    marginBottom: "25px",
    color: "#007bff",
    textDecoration: "none",
  },

  article: {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  image: {
    width: "100%",
    maxHeight: "420px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "20px",
  },

  category: {
    color: "#007bff",
    fontSize: "14px",
    fontWeight: "bold",
  },

  title: {
    fontSize: "36px",
    color: "#222",
    marginBottom: "15px",
  },

  meta: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "10px",
    color: "#777",
    fontSize: "14px",
    marginBottom: "25px",
  },

  description: {
    fontSize: "18px",
    lineHeight: "1.7",
    color: "#555",
    fontWeight: "500",
    marginBottom: "25px",
  },

  content: {
    fontSize: "16px",
    lineHeight: "1.9",
    color: "#444",
    whiteSpace: "pre-wrap",
  },

  message: {
    textAlign: "center",
    padding: "80px 20px",
    fontFamily: "Arial, sans-serif",
  },
};

export default BlogDetails;
