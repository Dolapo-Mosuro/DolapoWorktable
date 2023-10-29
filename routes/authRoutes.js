const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");

// Define authentication routes
router.post("/signup", userController.signup);
router.post("/signin", userController.signin);

module.exports = router;
