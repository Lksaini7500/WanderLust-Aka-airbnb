const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const wrapAsync = require("../utils/wrapAsync");
const { validateListing, isLoggedIn, isOwner } = require("../middleware.js");

const listingController = require("../controllers/listing.js");

//Index Route
router
  .route("/")
  .get(wrapAsync(listingController.index))
  // .post(
  //   isLoggedIn,
  //   validateListing,
  //   wrapAsync(listingController.createListing)
  // );
  .post(upload.single("listing[image]"), (req, res) => {
    res.send(req.file);
  });

//New route
router.get("/new", isLoggedIn, listingController.newListing);

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListing)
);

// Show Route
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;
