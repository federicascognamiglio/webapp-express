const express = require("express");
const moviesController = require("../controllers/moviesController");

const router = express.Router();

// Index
router.get("/", moviesController.index);

// Show
router.get("/:slug", moviesController.show);

// Store review
router.post("/:id/reviews", moviesController.storeReview);

module.exports = router;