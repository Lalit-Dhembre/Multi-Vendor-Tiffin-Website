const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const myUserRoute = require("./routes/myUserroute")

const MONGO_URL = "mongodb+srv://lalitdhembre6:Lalit%23xandy123@cluster0.ujvrs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(MONGO_URL)
.then(() => console.log("DATABASE CONNECTED!"))
.catch((err) => console.log(err))
const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.get('/',(req,res) =>{
    res.json({message : "Hello World"})
})
app.use("/api/user", myUserRoute)

app.listen(PORT,() => {console.log("Server Running on ",PORT)})