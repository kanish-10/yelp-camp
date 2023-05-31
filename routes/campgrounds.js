const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const Campground = require("../models/campground");
const campground = require("../controllers/campgrounds");
const { isLoggedIn, validateCampground, isUser } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });

router
  .route("/")
  .get(catchAsync(campground.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    catchAsync(campground.createCampground)
  );

router.get("/new", isLoggedIn, campground.renderNew);

router
  .route("/:id")
  .get(catchAsync(campground.renderShow))
  .put(
    isLoggedIn,
    isUser,
    upload.array("image"),
    validateCampground,
    catchAsync(campground.editCampground)
  )
  .delete(isLoggedIn, isUser, catchAsync(campground.deleteCampground));

router.get("/:id/edit", isLoggedIn, isUser, catchAsync(campground.renderEdit));

module.exports = router;
