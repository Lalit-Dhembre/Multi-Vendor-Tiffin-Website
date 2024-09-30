const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    auth0Id: {
        type : String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
    },
    name:{
        type: String,
    },
    address:{
        type:String
    },
    city:{
        type: String,
    },
    country:{
        type:String
    }
})

const User = mongoose.model("User", userSchema)

module.exports = {User}