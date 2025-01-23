const express = require("express");
const moviesController = require("../controllers/moviesController");

const router = express.Router();

// Index
router.get("/", moviesController.index);

//Show
router.get("/:id", moviesController.show);

module.exports = router;