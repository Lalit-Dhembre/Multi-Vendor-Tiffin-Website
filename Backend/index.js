const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.get('/',(req,res) =>{
    res.json({message : "Hello World"})
})

app.listen(PORT,() => {console.log("Server Running on ",PORT)})