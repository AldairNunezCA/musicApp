const express = require("express");
const { registerUserValidator, loginUserValidator } = require("../validators/auth_validator");
const { registerUser, loginUser, loginGoogle, loginFacebook } = require("../controllers/auth_controllers");
const { handleValidationErrors } = require("../middlewares/validationHandler_middleware");
const passport = require("../config/passport");

const router = express.Router();

router.post("/register", registerUserValidator, handleValidationErrors, registerUser);
router.post("/login", loginUserValidator, handleValidationErrors, loginUser);
router.get("/login/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/login/google/callback", passport.authenticate("google"), loginGoogle);
router.get("/login/facebook", passport.authenticate("facebook", { scope: ["email", "public_profile"] }));
router.get(
  "/login/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/login/facebook/error",
    failureMessage: true,
  }),
  loginFacebook
);

module.exports = router;
