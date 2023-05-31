const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const Campground = require("../models/campground");
const Review = require("../models/review");
const { isLoggedIn, reviewValidate, isReviewUser } = require("../middleware");
const review = require("../controllers/reviews");

router.post("/", reviewValidate, isLoggedIn, catchAsync(review.createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewUser,
  catchAsync(review.deleteReview)
);

module.exports = router;
