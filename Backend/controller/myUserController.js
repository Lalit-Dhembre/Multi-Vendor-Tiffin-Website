const { User } = require("../models/usermodels"); // Assuming your user model is exported as User

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
