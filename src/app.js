const express = require("express");
const app = express();
const { connectDB } = require("./config/database");
const User = require("./models/user");

// handling request and parsing json data
app.use(express.json());

app.post("/signup", async (req, res) => {
   // hard coded object
   // const userObj = {
   //    firstName: "Chandan",
   //    lastName: "Keshari",
   //    emailId: "chandankeshari64@gmail.com",
   //    password: "chandan@2003",
   // };

   // creating a new instance of user model
   // similar to classes & object
   // we can also define object directly without creating another object
   // const user = new User(userObj);

   const user = new User(req.body);

   // saving the object
   // it will return promise
   try {
      await user.save();
      res.send("User added successfully...");
   } catch (err) {
      res.status(400).send("Error saving the user: " + err.message);
   }
});

// get a user by email
app.get("/user", async (req, res) => {
   const userEmail = req.body.emailId;
   try {
      const user = await User.findOne({ emailId: userEmail });
      if (user.length === 0) {
         res.status(400).send("User not found!!!");
      } else res.send(user);
   } catch (err) {
      res.status(400).send("Something went wrong...");
   }
});

// Feed API - GET /feed : get all the users from the DB
app.get("/feed", async (req, res) => {
   try {
      const users = await User.find({});
      res.send(users);
   } catch (err) {
      res.status(400).send("Something went wrong...");
   }
});

app.delete("/user", async (req, res) => {
   const userId = req.body.userId;
   try {
      // const user = await User.findByIdAndDelete({ userId });
      const user = await User.findByIdAndDelete({ _id: userId });
      res.send("User deleted successfully!!!");
   } catch (err) {
      res.status(400).send("Something went wrong...");
   }
});
app.patch("/user/:userId", async (req, res) => {
   const userId = req.params?.userId;
   const data = req.body;

   try {
      const ALLOWED_UPDATES = ["userId", "skills", "photoUrl", "about", "gender", "age"];

      const isUpdatedAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

      if (!isUpdatedAllowed) {
         throw new Error("Update not allowed...");
      }

      if (data?.skills.length > 10) {
         throw new Error("Skills can't be more than 10...");
      }
      const user = await User.findByIdAndUpdate({ _id: userId }, data, {
         runValidators: true,
         returnDocument: "after",
      });
      console.log(user);
      res.send("Updated successfully...");
   } catch (err) {
      res.status(400).send("UPDATE FAILED: " + err.message);
   }
});

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
