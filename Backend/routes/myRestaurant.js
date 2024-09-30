const express = require("express");
const { jwtCheck, jwtDecode } = require("../middleware/auth");
const {
  createMyRestaurant,
  getMyRestaurant,
  getMyRestaurantOrders,
  updateMyRestaurant,
  updateOrderStatus,
} = require("../controller/myRestaurant");
const multer = require("multer");
const { validateMyRestaurantRequest } = require("../middleware/validate");

const router = express.Router();

// Configure multer for memory storage and file size limit
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5 MB
  },
});

// POST route to create a restaurant
router.post("/",upload.single("imageFile"), validateMyRestaurantRequest ,jwtCheck,jwtDecode,createMyRestaurant);

// GET route to retrieve restaurant details
router.get("/", jwtCheck, jwtDecode, getMyRestaurant);

// PUT route to update restaurant details
router.put(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtDecode,
  updateMyRestaurant
);

// GET route to fetch restaurant orders
router.get("/order", jwtCheck, jwtDecode, getMyRestaurantOrders);

// PATCH route to update the order status
router.patch("/order/:orderId/status", jwtCheck, jwtDecode, updateOrderStatus);

module.exports = router;
