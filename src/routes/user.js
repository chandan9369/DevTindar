const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const { ConnectionRequest } = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName photoUrl, age gender skills about";

userRouter.get("/user/request/received", userAuth, async (req, res) => {
   try {
      const loggedInUser = req.user;

      const connectionRequests = await ConnectionRequest.find({
         toUserId: loggedInUser._id,
         status: "interested",
      }).populate("fromUserId", USER_SAFE_DATA);
      // }).populate("fromUserId", ["firstName", "lastName"]);

      res.json({
         message: "Data fetched successfully...",
         data: connectionRequests,
      });
   } catch (err) {
      res.status(400).send("ERROR: " + err.message);
   }
});

userRouter.get("/user/request/connections", userAuth, async (req, res) => {
   try {
      const loggedInUser = req.user;
      const allConnections = await ConnectionRequest.find({
         $or: [
            { fromUserId: loggedInUser._id, status: "accepted" },
            { toUserId: loggedInUser._id, status: "accepted" },
         ],
      })
         .populate("fromUserId", USER_SAFE_DATA)
         .populate("toUserId", USER_SAFE_DATA);

      const data = allConnections.map((connectionRequest) => (connectionRequest.fromUserId._id.toString() === loggedInUser._id.toString() ? connectionRequest.toUserId : connectionRequest.fromUserId));
      res.json({
         message: "All connection fetched successfully...",
         data,
      });
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
});

module.exports = { userRouter };
