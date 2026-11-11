// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const AuthRouter = require("./Routes/AuthRouter");
// const ProductRouter = require("./Routes/ProductRouter");
// const NewsletterRouter = require("./Routes/NewsletterRouter");
// const CVRouter = require("./Routes/CVRouter");
// require("dotenv").config();
// // require("./Models/db");
// const connectDB = require("./Models/db");
// const PORT = process.env.PORT || 8080;
// const CVEmailOTPRouter = require("./Routes/CVEmailOTPRouter");

// app.get("/ping", (req, res) => {
//   res.send("PONG");
// });

// app.use(bodyParser.json());
// app.use(cors());
// app.use("/signup-login/auth", AuthRouter);

// app.use("/signup-login/products", ProductRouter);
// app.use("/api/cv", CVRouter);

// app.use("/api/cv", CVEmailOTPRouter);
// // Local development server
// if (require.main === module) {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// }
// // Above last use
// // app.listen(PORT, () => {
// //   console.log(`Server is running on ${PORT}`);
// // });
// app.use("/api/newsletter", NewsletterRouter);
// module.exports = app;

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

// Newsletter
app.use("/api/newsletter", NewsletterRouter);

// CV download and OTP
app.use("/api/cv", CVRouter);
app.use("/api/cv", CVEmailOTPRouter);

// Local development only
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
