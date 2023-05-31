const User = require("../models/user");

module.exports.renderRegister = (req, res) => {
  res.render("users/register");
};

module.exports.RegisterUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registerUser = await User.register(user, password);
    req.login(registerUser, (err) => {
      if (err) return next(err);
      req.flash("success", `Welcome ${registerUser.username} to YelpCamp`);
      res.redirect("/campgrounds");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

module.exports.LoginUser = async (req, res) => {
  const redirectUrl = res.locals.returnTo || "/campgrounds";
  const { email } = req.body;
  const user = await User.findOne({ email });
  req.flash("success", `Welcome back ${user.username}`);
  res.redirect(redirectUrl);
};

module.exports.LogoutUser = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Goodbye!");
    res.redirect("/campgrounds");
  });
};
