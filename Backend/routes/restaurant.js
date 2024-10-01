const express= require("express")
const { param }= require("express-validator")
const {
  getRestaurant,
  searchRestaurant,
}= require("../controller/restaurant")

const router = express.Router()

router.get(
  "/:restaurantId",
  param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Restaurant Id parameter must be a valid string"),
  getRestaurant
)

router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be a valid string"),
  searchRestaurant
)

module.exports = router