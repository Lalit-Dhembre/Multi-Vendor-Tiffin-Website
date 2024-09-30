const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose");


mongoose.connect(process.env.MONGO_URL.toString)
.then(() => console.log("DATABASE CONNECTED!"))
.catch((err) => console.log(err))
const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.get('/',(req,res) =>{
    res.json({message : "Hello World"})
})

app.listen(PORT,() => {console.log("Server Running on ",PORT)})