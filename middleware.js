const ExpressError = require("./utils/ExpressError");
const { campgroundSchema, reviewSchema } = require("./schema");
const Campground = require("./models/campground");
const Review = require("./models/review");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in.");
    return res.redirect("/login");
  }
  next();
};

module.exports.storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};

module.exports.validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.isUser = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground.user.equals(req.user._id)) {
    req.flash("error", "You don't have permission to do that");
    return res.redirect(`/campgrounds/${req.params.id}`);
  }
  next();
};

module.exports.isReviewUser = async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.user.equals(req.user._id)) {
    req.flash("error", "You don't have permission to do that");
    return res.redirect(`/campgrounds/${req.params.id}`);
  }
  next();
};

module.exports.reviewValidate = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
