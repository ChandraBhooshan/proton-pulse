function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with React",
      author: "Buddy",
      date: "May 26, 2026",
      content:
        "React is a powerful JavaScript library used to build modern user interfaces. It allows developers to create reusable components and build fast, interactive web applications.",
    },
    {
      id: 2,
      title: "Why Components Matter",
      author: "Buddy",
      date: "May 24, 2026",
      content:
        "Components help organize UI into reusable blocks. This makes applications easier to maintain, scale, and debug.",
    },
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>My React Blog</h1>
        <p style={styles.subtitle}>
          Learn React concepts with simple blog posts.
        </p>
      </header>

      <main>
        {blogPosts.map((post) => (
          <div key={post.id} style={styles.card}>
            <h2 style={styles.postTitle}>{post.title}</h2>

            <div style={styles.meta}>
              <span>By {post.author}</span>
              <span>{post.date}</span>
            </div>

            <p style={styles.content}>{post.content}</p>

            <button style={styles.button}>Read More</button>
          </div>
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
    fontSize: "14px",
    color: "#777",
    marginBottom: "15px",
  },

  content: {
    lineHeight: "1.7",
    color: "#444",
  },

  button: {
    marginTop: "15px",
    padding: "10px 18px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
  },

  footer: {
    textAlign: "center",
    marginTop: "40px",
    color: "#777",
    fontSize: "14px",
  },
};

export default Blog;
