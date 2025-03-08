const express = require("express");
const app = express();
const { adminAuth, userAuth } = require("./auth");

// below route handler can work for all : use, get, post, patch etc.

// GET /route => middleware chain => route handler

// Handling Auth Middleware for all GET, POST,...etc.
app.use("/admin", adminAuth);

app.get("/user", userAuth, (req, res) => {
   // this will only call if admin is authorized
   res.send("Sending data...");
});

// app.use(
//    "/user",
//    (req, res, next) => {
//       console.log("Handling the route user 1 !!");
//       res.send("Response !!");
//       next(); // if we don't send any response here then it will go to new handler
//    },
//    (req, res) => {
//       // this handler, only be called if there is next() in previous handler
//       console.log("Handling the route user 2 !!");
//       //   res.send("2nd Response !!"); // this will throw error if above handler already send response
//    }
// );
app.listen(3000, () => {
   console.log("http://localhost:3000");
});
