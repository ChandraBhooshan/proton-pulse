// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import API_URL from "../../config.js";

// const initialBlog = {
//   title: "",
//   slug: "",
//   category: "",
//   description: "",
//   content: "",
//   featuredImage: "",
//   seoTitle: "",
//   metaDescription: "",
// };

// function BlogEditor() {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const isEditing = Boolean(id);

//   const [blog, setBlog] = useState(initialBlog);
//   const [loading, setLoading] = useState(false);
//   const [loadingBlog, setLoadingBlog] = useState(isEditing);

//   useEffect(() => {
//     if (!isEditing) return;

//     const fetchBlog = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         if (!token) {
//           navigate("/signup-login/login", { replace: true });
//           return;
//         }

//         const response = await fetch(`${API_URL}/api/blogs/admin/all`, {
//           headers: {
//             Authorization: token,
//           },
//         });

//         const data = await response.json();

//         if (response.status === 401) {
//           localStorage.removeItem("token");
//           localStorage.removeItem("loggedInUser");
//           navigate("/signup-login/login", { replace: true });
//           return;
//         }

//         if (!response.ok) {
//           throw new Error(data.message || "Unable to load blog.");
//         }

//         const selectedBlog = data.blogs.find((item) => item._id === id);

//         if (!selectedBlog) {
//           throw new Error("Blog not found.");
//         }

//         setBlog({
//           title: selectedBlog.title || "",
//           slug: selectedBlog.slug || "",
//           category: selectedBlog.category || "",
//           description: selectedBlog.description || "",
//           content: selectedBlog.content || "",
//           featuredImage: selectedBlog.featuredImage || "",
//           seoTitle: selectedBlog.seoTitle || "",
//           metaDescription: selectedBlog.metaDescription || "",
//         });
//       } catch (error) {
//         console.error("Load blog error:", error);
//         alert(error.message);
//         navigate("/admin/blogs");
//       } finally {
//         setLoadingBlog(false);
//       }
//     };

//     fetchBlog();
//   }, [id, isEditing, navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setBlog((prev) => ({
//       ...prev,
//       [name]: value,
//       ...(name === "title" && !prev.slug
//         ? {
//             slug: value
//               .toLowerCase()
//               .trim()
//               .replace(/[^a-z0-9]+/g, "-")
//               .replace(/^-|-$/g, ""),
//           }
//         : {}),
//     }));
//   };

//   const handleSave = async (status) => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       navigate("/signup-login/login", { replace: true });
//       return;
//     }

//     if (
//       !blog.title.trim() ||
//       !blog.slug.trim() ||
//       !blog.category ||
//       !blog.description.trim() ||
//       !blog.content.trim()
//     ) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch(
//         isEditing ? `${API_URL}/api/blogs/${id}` : `${API_URL}/api/blogs`,
//         {
//           method: isEditing ? "PUT" : "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token,
//           },
//           body: JSON.stringify({
//             ...blog,
//             status,
//           }),
//         },
//       );

//       const data = await response.json();

//       if (response.status === 401) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("loggedInUser");

//         navigate("/signup-login/login", { replace: true });
//         return;
//       }

//       if (response.status === 403) {
//         alert(data.message || "Admin access required.");
//         return;
//       }

//       if (!response.ok) {
//         throw new Error(data.message || "Unable to save blog.");
//       }

//       alert(data.message || "Blog saved successfully.");
//       navigate("/admin/blogs");
//     } catch (error) {
//       console.error("Save blog error:", error);
//       alert(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loadingBlog) {
//     return <p>Loading blog...</p>;
//   }

//   return (
//     <div className="admin-blog-editor">
//       <div className="admin-page-heading">
//         <div>
//           <h1>{isEditing ? "Edit Blog" : "Create Blog"}</h1>
//           <p>
//             {isEditing
//               ? "Update your existing article."
//               : "Write and publish a new article."}
//           </p>
//         </div>
//       </div>

//       <form className="admin-section-card" onSubmit={(e) => e.preventDefault()}>
//         <div className="admin-form-group">
//           <label>Blog Title *</label>
//           <input
//             name="title"
//             value={blog.title}
//             onChange={handleChange}
//             placeholder="Enter blog title"
//             required
//           />
//         </div>

//         <div className="admin-form-group">
//           <label>URL Slug *</label>
//           <input
//             name="slug"
//             value={blog.slug}
//             onChange={handleChange}
//             placeholder="blog-url-slug"
//             required
//           />
//         </div>

//         <div className="admin-form-group">
//           <label>Category *</label>
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
//           <label>Short Description *</label>
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
//           <label>Featured Image URL</label>
//           <input
//             name="featuredImage"
//             value={blog.featuredImage}
//             onChange={handleChange}
//             placeholder="https://example.com/image.jpg"
//           />
//         </div>

//         <div className="admin-form-group">
//           <label>Blog Content *</label>
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
//             placeholder="SEO description"
//             rows="3"
//           />
//         </div>

//         <div className="admin-editor-actions">
//           <button
//             type="button"
//             className="admin-secondary-btn"
//             disabled={loading}
//             onClick={() => handleSave("draft")}
//           >
//             {loading ? "Saving..." : "Save Draft"}
//           </button>

//           <button
//             type="button"
//             className="admin-primary-btn"
//             disabled={loading}
//             onClick={() => handleSave("published")}
//           >
//             {loading ? "Processing..." : "Publish Blog"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default BlogEditor;

// import { useEffect, useState } from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import API_URL from "../../config.js";
import "./Admin.css";

const initialBlog = {
  title: "",
  slug: "",
  category: "",
  description: "",
  content: "",
  featuredImage: "",
  seoTitle: "",
  metaDescription: "",
};

function BlogEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const contentToLoad = useRef("");
  const [blog, setBlog] = useState(initialBlog);
  const [loading, setLoading] = useState(false);
  const [loadingBlog, setLoadingBlog] = useState(isEditing);

  // TipTap editor configuration
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "blog-tiptap-content",
        spellcheck: "true",
      },
    },
    onUpdate: ({ editor }) => {
      setBlog((prev) => ({
        ...prev,
        content: editor.getHTML(),
      }));
    },
  });

  // Load existing blog when editing
  useEffect(() => {
    if (!isEditing) return;

    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/signup-login/login", { replace: true });
          return;
        }

        const response = await fetch(`${API_URL}/api/blogs/admin/all`, {
          headers: {
            Authorization: token,
          },
        });

        const data = await response.json();

        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("loggedInUser");
          navigate("/signup-login/login", { replace: true });
          return;
        }

        if (response.status === 403) {
          throw new Error("Admin access required.");
        }

        if (!response.ok) {
          throw new Error(data.message || "Unable to load blog.");
        }

        const selectedBlog = data.blogs.find((item) => item._id === id);

        if (!selectedBlog) {
          throw new Error("Blog not found.");
        }
        contentToLoad.current = selectedBlog.content || "";
        setBlog({
          title: selectedBlog.title || "",
          slug: selectedBlog.slug || "",
          category: selectedBlog.category || "",
          description: selectedBlog.description || "",
          content: selectedBlog.content || "",
          featuredImage: selectedBlog.featuredImage || "",
          seoTitle: selectedBlog.seoTitle || "",
          metaDescription: selectedBlog.metaDescription || "",
        });
      } catch (error) {
        console.error("Load blog error:", error);
        alert(error.message);
        navigate("/admin/blogs");
      } finally {
        setLoadingBlog(false);
      }
    };

    fetchBlog();
  }, [id, isEditing, navigate]);

  // Load saved content into TipTap
  //   useEffect(() => {
  //     if (editor && !loadingBlog) {
  //       editor.commands.setContent(blog.content || "", {
  //         emitUpdate: false,
  //       });
  //     }
  //   }, [editor, loadingBlog]);

  useEffect(() => {
    if (editor && !loadingBlog && isEditing) {
      editor.commands.setContent(contentToLoad.current, {
        emitUpdate: false,
      });
    }
  }, [editor, loadingBlog, isEditing]);
  
  // Handle normal form fields
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

  // Insert hyperlink
  const addLink = () => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href || "";
    const url = window.prompt("Enter URL:", previousUrl);

    if (url === null) return;

    if (url.trim() === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }

    try {
      const parsedUrl = new URL(url);

      if (!["http:", "https:", "mailto:"].includes(parsedUrl.protocol)) {
        alert("Please enter a valid HTTP, HTTPS, or email link.");
        return;
      }

      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url.trim() })
        .run();
    } catch {
      alert("Please enter a valid URL, including https://");
    }
  };

  // Insert image into article content
  const addImage = () => {
    if (!editor) return;

    const url = window.prompt("Enter image URL:");

    if (!url) return;

    try {
      const parsedUrl = new URL(url);

      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        alert("Please enter a valid HTTP or HTTPS image URL.");
        return;
      }

      editor.chain().focus().setImage({ src: url.trim() }).run();
    } catch {
      alert("Please enter a valid image URL.");
    }
  };

  // Save blog
  const handleSave = async (status) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signup-login/login", { replace: true });
      return;
    }

    const content = editor?.getHTML() || "";

    if (
      !blog.title.trim() ||
      !blog.slug.trim() ||
      !blog.category ||
      !blog.description.trim() ||
      !editor?.getText().trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        isEditing ? `${API_URL}/api/blogs/${id}` : `${API_URL}/api/blogs`,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            ...blog,
            content,
            status,
          }),
        },
      );

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        navigate("/signup-login/login", { replace: true });
        return;
      }

      if (response.status === 403) {
        alert(data.message || "Admin access required.");
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Unable to save blog.");
      }

      alert(data.message || "Blog saved successfully.");
      navigate("/admin/blogs");
    } catch (error) {
      console.error("Save blog error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loadingBlog) {
    return <p>Loading blog...</p>;
  }

  if (!editor) {
    return <p>Loading editor...</p>;
  }

  return (
    <div className="admin-blog-editor">
      <div className="admin-page-heading">
        <div>
          <h1>{isEditing ? "Edit Blog" : "Create Blog"}</h1>
          <p>
            {isEditing
              ? "Update your existing article."
              : "Write and publish a new article."}
          </p>
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

          {blog.featuredImage && (
            <img
              src={blog.featuredImage}
              alt="Featured preview"
              className="admin-featured-preview"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
        </div>

        {/* Rich text editor */}
        <div className="admin-form-group">
          <label>Blog Content *</label>

          <div className="blog-editor-wrapper">
            <div className="blog-editor-toolbar">
              <button
                type="button"
                className={editor.isActive("bold") ? "active" : ""}
                onClick={() => editor.chain().focus().toggleBold().run()}
                title="Bold"
              >
                <strong>B</strong>
              </button>

              <button
                type="button"
                className={editor.isActive("italic") ? "active" : ""}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                title="Italic"
              >
                <em>I</em>
              </button>

              <button
                type="button"
                className={editor.isActive("strike") ? "active" : ""}
                onClick={() => editor.chain().focus().toggleStrike().run()}
                title="Strikethrough"
              >
                <s>S</s>
              </button>

              <span className="blog-toolbar-divider" />

              <button
                type="button"
                className={
                  editor.isActive("heading", { level: 1 }) ? "active" : ""
                }
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                title="Heading 1"
              >
                H1
              </button>

              <button
                type="button"
                className={
                  editor.isActive("heading", { level: 2 }) ? "active" : ""
                }
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                title="Heading 2"
              >
                H2
              </button>

              <button
                type="button"
                className={
                  editor.isActive("heading", { level: 3 }) ? "active" : ""
                }
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                title="Heading 3"
              >
                H3
              </button>

              <span className="blog-toolbar-divider" />

              <button
                type="button"
                className={editor.isActive("bulletList") ? "active" : ""}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                title="Bulleted list"
              >
                • List
              </button>

              <button
                type="button"
                className={editor.isActive("orderedList") ? "active" : ""}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                title="Numbered list"
              >
                1. List
              </button>

              <button
                type="button"
                className={editor.isActive("blockquote") ? "active" : ""}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                title="Quote"
              >
                Quote
              </button>

              <span className="blog-toolbar-divider" />

              <button
                type="button"
                onClick={addLink}
                className={editor.isActive("link") ? "active" : ""}
                title="Insert link"
              >
                Link
              </button>

              <button type="button" onClick={addImage} title="Insert image">
                Image
              </button>

              <span className="blog-toolbar-divider" />

              {["left", "center", "right", "justify"].map((alignment) => (
                <button
                  key={alignment}
                  type="button"
                  className={
                    editor.isActive({ textAlign: alignment }) ? "active" : ""
                  }
                  onClick={() =>
                    editor.chain().focus().setTextAlign(alignment).run()
                  }
                  title={`Align ${alignment}`}
                >
                  {alignment === "left"
                    ? "⇤"
                    : alignment === "center"
                      ? "↔"
                      : alignment === "right"
                        ? "⇥"
                        : "☰"}
                </button>
              ))}

              <span className="blog-toolbar-divider" />

              <button
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                title="Undo"
              >
                ↶
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                title="Redo"
              >
                ↷
              </button>
            </div>

            <EditorContent editor={editor} />
          </div>

          <small className="blog-editor-help">
            Use the toolbar to format your article. Images and links are
            inserted using URLs.
          </small>
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
            placeholder="SEO description"
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
