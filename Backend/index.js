const express = require("express")
const cors = require("cors")
require('dotenv').config();
const mongoose = require("mongoose");
const myUserRoute = require("./routes/myUserroute")
const cloudinary = require("cloudinary").v2; // Use require for cloudinary
const myRestaurantRoute = require("./routes/myRestaurant");
const restaurantRoute = require("./routes/restaurant");
const orderRoute = require("./routes/order");


mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DATABASE CONNECTED!"))
.catch((err) => console.log(err))
const app = express()
const PORT = 3000

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

app.use(cors())
app.use(express.json())

app.get('/',(req,res) =>{
    res.json({message : "Hello World"})
})
app.use("/api/user", myUserRoute)
app.use("/api/my/restaurant", myRestaurantRoute)
app.use("/api/restaurant", restaurantRoute)
// app.use("/api/order", orderRoute)

app.listen(PORT,() => {console.log("Server Running on ",PORT)})