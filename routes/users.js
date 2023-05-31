const express = require("express");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const { storeReturnTo } = require("../middleware");
const user = require("../controllers/users");

router
  .route("/register")
  .get(user.renderRegister)
  .post(catchAsync(user.RegisterUser));

router
  .route("/login")
  .get(user.renderLogin)
  .post(
    storeReturnTo,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    catchAsync(user.LoginUser)
  );

router.get("/logout", user.LogoutUser);

module.exports = router;
