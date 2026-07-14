const { signup, login } = require("../Controllers/AuthController");
const {
  signupValidation,
  loginValidation,
} = require("../Middlewares/AuthValidation");

const router = require("express").Router();

router.post('/login', loginValidation, login);
// router.get("/login", (req, res) => {
//   res.send("PONG_AUTH_LOGIN");
// });

router.post("/signup", signupValidation, signup);

module.exports = router;
