const jwt = require("jsonwebtoken");
const secretKey = "DEV@#TINDER23";
const User = require("../models/user");

const adminAuth = (req, res, next) => {
   const token = "xyz";
   const isAdminAuthorized = token === "xyz";
   if (!isAdminAuthorized) {
      res.status(401).send("Unauthorized request !!");
   } else {
      res.send("Next handler!!!");
      next();
   }
};

const userAuth = async (req, res, next) => {
   try {
      // Read the token from the request cookies
      const { token } = req.cookies;
      if (!token) {
         throw new Error("Invalid Token !!!");
      }

      // validate the token
      const { _id } = await jwt.verify(token, secretKey);

      // find the user
      const user = await User.findById(_id);

      if (!user) {
         throw new Error("User doesn't exist !!!");
      }

      req.user = user;
      // next is called to move to request handler
      next();
   } catch (err) {
      res.status(400).send("ERROR: " + err.message);
   }
};
module.exports = {
   adminAuth,
   userAuth,
};
