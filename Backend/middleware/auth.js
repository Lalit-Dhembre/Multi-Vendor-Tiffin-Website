const { auth } = require("express-oauth2-jwt-bearer");
const jwt = require("jsonwebtoken");
const { User } = require("../models/usermodels");
require('dotenv').config();


const jwtCheck = auth({
  audience: process.env.audience,
  issuerBaseURL: process.env.AUTH0,
  tokenSigningAlg: 'RS256'
});
const jwtDecode = async (req, res, next) => {
  const { authorization } = req.headers;

  // Check if the Authorization header exists and contains a Bearer token
  if (!authorization || !authorization.startsWith("Bearer")) {
    return res.sendStatus(401);  // Unauthorized
  }
  
  const token = authorization.split(" ")[1];

  try {
    // Decode the token (synchronously)
    const decoded = jwt.decode(token);

    const auth0Id = decoded.sub

    const user = await User.findOne({auth0Id})

    if (!decoded) {
      return res.sendStatus(401);  // Unauthorized if decoding fails
    }

    req.auth0Id = auth0Id.toString()
    req.userId = user._id.toString()

    console.log(decoded);  // Log the decoded payload
    next();  // Proceed to the next middleware
  } catch (err) {
    console.log(err);
    return res.sendStatus(401);  // Unauthorized if any error occurs
  }
};

// Export both jwtCheck and jwtDecode
module.exports = { jwtCheck, jwtDecode };
