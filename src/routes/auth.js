const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");

// app and router are same

authRouter.post("/signup", async (req, res) => {
   try {
      // Validatation of data
      validateSignUpData(req);

      const { firstName, lastName, emailId, password } = req.body;
      // Encrypt the password
      const passwordHash = await bcrypt.hash(password, 10);

      const user = new User({
         firstName,
         lastName,
         emailId,
         password: passwordHash,
      });

      // saving the object
      // it will return promise
      await user.save();
      res.send("User added successfully...");
   } catch (err) {
      res.status(400).send("Error saving the user: " + err.message);
   }
});

authRouter.get("/login", async (req, res) => {
   try {
      const { emailId, password } = req.body;
      // search for user
      const user = await User.findOne({ emailId: emailId });

      if (!user) {
         throw new Error("Invalid credentials !!!");
      }
      // check if password is valid
      const isPasswordValid = await user.validatePassword(password);

      if (!isPasswordValid) {
         throw new Error("Invalid credentials !!!");
      } else {
         // Create a JWT Token
         const token = await user.getJWT();

         // Add the token to cookie and send the response back to the user
         res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) });
         res.send("Login successfully...");
      }
   } catch (err) {
      res.status(400).send("ERROR : " + err.message);
   }
});

authRouter.post("/logout", async (req, res) => {
   try {
      res.cookie("token", null, {
         expires: new Date(Date.now()),
      });

      res.send("Logout Successfully...");
   } catch (err) {
      res.send("ERROR: " + err.message);
   }
});

module.exports = { authRouter };
