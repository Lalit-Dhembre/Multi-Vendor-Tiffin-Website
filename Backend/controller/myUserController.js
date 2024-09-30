const { User } = require("../models/usermodels"); // Assuming your user model is exported as User
// const { use } = require("../routes/myUserroute");

exports.createCurrentUser = async (req, res) => {
  try {
    const { auth0id } = req.body;
    const existingUser = await User.findOne({ auth0id });
    if (existingUser) {
      return res.status(200).send();
    }
    const newUser = new User(req.body);

    await newUser.save();
    res.status(201).json(newUser.toObject());
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.updateCurrentUser = async (req,res) => {
    try{
        const {name, address, city, country} = req.body
        const user = await User.findById(req.userId)
        if(!user) return res.status(404).json({message: "User not found"})
        
        user.name = name
        user.address = address
        user.city = city
        user.country = country

        await user.save()
        res.send(user)

    }catch(err){
        console.log(err);
        res.staus(500).json({msg : "Internal Server Error"})    
    }
}