const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const bcrypt = require("bcrypt");
const { validateEditProfileData } = require("../utils/validation");
const validator = require("validator");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
   try {
      // first userAuth middleware run -> this function
      res.send(req.user);
   } catch (err) {
      res.status(400).send("ERROR: " + err.message);
   }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
   try {
      if (!validateEditProfileData(req)) {
         throw new Error("Invalid Edit Request !!!");
      }

      const loggedInUser = req.user;

      Object.keys(req.body).forEach((key) => {
         loggedInUser[key] = req.body[key];
      });

      await loggedInUser.save();
      res.json({ message: `${loggedInUser.firstName}, profile updated successfully...`, data: loggedInUser });
   } catch (err) {
      res.status(400).send("ERROR: " + err.message);
   }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
   try {
      const { currPassword, newPassword } = req.body;
      // check first if current password is valid
      const loggedInUser = req.user;
      const isValid = await loggedInUser.validatePassword(currPassword);
      if (!isValid) {
         throw new Error("Invalid Current Password...");
      }
      if (!validator.isStrongPassword(newPassword)) {
         throw new Error("Please, Enter Strong Password...");
      }
      // Encrypt the password
      const newPasswordHash = await bcrypt.hash(newPassword, 10);
      loggedInUser.password = newPasswordHash;
      await loggedInUser.save();

      res.send(`${loggedInUser.firstName}'s password changed successfully...`);
   } catch (err) {
      res.status(400).send("ERROR: " + err.message);
   }
});

module.exports = { profileRouter };
