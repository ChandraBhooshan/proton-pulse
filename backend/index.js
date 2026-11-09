const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const ProductRouter = require("./Routes/ProductRouter");
const NewsletterRouter = require("./Routes/NewsletterRouter");
const CVRouter = require("./Routes/CVRouter");

require("dotenv").config();
require("./Models/db");
const PORT = process.env.PORT || 8080;

app.get("/ping", (req, res) => {
  res.send("PONG");
});

app.use(bodyParser.json());
app.use(cors());
app.use("/signup-login/auth", AuthRouter);

app.use("/signup-login/products", ProductRouter);
app.use("/api/cv", CVRouter);

// Local development server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
// Above last use
// app.listen(PORT, () => {
//   console.log(`Server is running on ${PORT}`);
// });
app.use("/api/newsletter", NewsletterRouter);
module.exports = app;
