require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./Models/db");

const app = express();
const PORT = process.env.PORT || 8080;

// Import routes after environment initialization
const AuthRouter = require("./Routes/AuthRouter");
const ProductRouter = require("./Routes/ProductRouter");
const NewsletterRouter = require("./Routes/NewsletterRouter");
const CVRouter = require("./Routes/CVRouter");
const CVEmailOTPRouter = require("./Routes/CVEmailOTPRouter");
const QuizRouter = require("./Routes/QuizRouter");
const BlogRouter = require("./Routes/BlogRouter");
const AnalyticsRouter = require("./Routes/AnalyticsRouter");
// Middleware
app.use(cors());
app.use(express.json());

// Health check - does not require MongoDB
app.get("/ping", (req, res) => {
  res.send("PONG");
});

// Ensure MongoDB is connected before processing API requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database unavailable:", error.message);

    return res.status(503).json({
      success: false,
      message: "Database temporarily unavailable.",
    });
  }
});

// Authentication and products
app.use("/signup-login/auth", AuthRouter);
app.use("/signup-login/products", ProductRouter);
// Quiz
app.use("/api/quiz", QuizRouter);

// Newsletter
app.use("/api/newsletter", NewsletterRouter);

// CV download and OTP
app.use("/api/cv", CVRouter);
app.use("/api/cv", CVEmailOTPRouter);

app.use("/api/blogs", BlogRouter);
app.use("/api/analytics", AnalyticsRouter);

// Local development only
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
