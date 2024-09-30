// const express= require("express")
// const{ jwtCheck, jwtDecode } =require("../middleware/auth")
// // const{
// //   createCheckoutSession,
// //   getMyOrders,
// //   stripeWebhookHandler,
// // } =require("../controller/order")

// const router = express.Router()

// router.get("/", jwtCheck, jwtDecode, getMyOrders)

// router.post(
//   "/checkout/create-checkout-session",
//   jwtCheck,
//   jwtDecode,
//   createCheckoutSession
// )

// router.post("/checkout/webhook", stripeWebhookHandler)

// module.export = router