const express = require("express");
const app = express();
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");

// handling request and parsing json data
app.use(express.json());
app.use(cookieParser());

// routers
const { authRouter } = require("./routes/auth");
const { profileRouter } = require("./routes/profile");
const { requestRouter } = require("./routes/request");
const { userRouter } = require("./routes/user");

// routes will checked one by one
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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
