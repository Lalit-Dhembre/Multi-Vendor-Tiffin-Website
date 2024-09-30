const express = require("express")
const controller = require("../controller/myUserController")

const router = express.Router()

router.post("/", controller.createCurrentUser)

module.exports = router