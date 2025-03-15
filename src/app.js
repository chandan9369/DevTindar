const express = require("express");
const app = express();
const { connectDB } = require("./config/database");
const User = require("./models/user");
const validateSignUpData = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth");

// handling request and parsing json data
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

app.get("/login", async (req, res) => {
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

app.get("/profile", userAuth, async (req, res) => {
   try {
      // first userAuth middleware run -> this function
      res.send(req.user);
   } catch (err) {
      res.status(400).send("ERROR: " + err.message);
   }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {});
// first -> connect database -> then -> start listening
connectDB()
   .then(() => {
      console.log("Database connection established...");
      app.listen(3000, () => {
         console.log("http://localhost:3000");
      });
   })
   .catch((err) => {
      console.log("Database can't be connected...");
   });

// // app.get() only work to handle get request
// app.get("/", (req, res) => {
//    res.send("hii, from bunny :)");
// });
// // // using app.use() will match all the http method
// // app.use("/test", (req, res) => {
// //    res.send("hii");
// // });
