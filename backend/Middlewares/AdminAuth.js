const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");

const ensureAdmin = async (req, res, next) => {
  const auth = req.headers["authorization"];

  if (!auth) {
    return res.status(401).json({
      success: false,
      message: "Authentication token is required.",
    });
  }

  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded._id).select(
      "_id name email role",
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User account not found.",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Admin authentication error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token.",
    });
  }
};

module.exports = ensureAdmin;
