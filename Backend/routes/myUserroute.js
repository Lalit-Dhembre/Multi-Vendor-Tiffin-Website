const express = require("express");
const controller = require("../controller/myUserController");
const { jwtCheck, jwtDecode } = require("../middleware/auth");

const router = express.Router();

// Route for creating a user
router.post("/create", jwtCheck, controller.createCurrentUser);

// Route for updating a user
router.post("/update", jwtCheck, jwtDecode, controller.updateCurrentUser);

module.exports = router;
