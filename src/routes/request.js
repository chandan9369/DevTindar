const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const User = require("../models/user");
const { ConnectionRequest } = require("../models/connectionRequest");

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
   try {
      const fromUserId = req.user._id;
      const { status, toUserId } = req.params;

      // Check : if both toUserId is in DB or not?
      const toUser = await User.findById(toUserId);

      if (!toUser) {
         return res.status(400).json({
            message: "Destination User not found !!!",
         });
      }

      // Check : if fromUserId & toUserId should be different

      // if (fromUserId === toUserId) {
      //    return res.status(400).json({
      //       message: "Can't send connection request to yourself!!!",
      //    });
      // }

      // Check : if status is from allowed fields
      const allowedStatus = ["ignored", "interested"];

      if (!allowedStatus.includes(status)) {
         return res.status(400).json({ message: "Invalid status type: " + status });
      }

      // Check : if there is already an existing connection request
      const existingConnectionRequest = await ConnectionRequest.findOne({
         $or: [
            { fromUserId, toUserId },
            { fromUserId: toUserId, toUserId: fromUserId },
         ],
      });

      if (existingConnectionRequest) {
         return res.status(400).json({
            message: "Connection Request already exist !!!",
         });
      }

      const newConnectionRequest = new ConnectionRequest({ fromUserId, toUserId, status });

      const data = await newConnectionRequest.save();

      res.json({
         message: "Connection request handled successfully...",
         data,
      });
   } catch (err) {
      res.status(400).send("ERROR: " + err.message);
   }
});

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
   try {
      // loggedInUser = toUserId
      // status = interested
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      // Check : Validate status
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
         return res.status(400).json({
            message: "Status is not valid...",
         });
      }
      // Check : request id is valid or not?
      const connectRequest = await ConnectionRequest.findOne({ fromUserId: requestId, toUserId: loggedInUser._id, status: "interested" });

      if (!connectRequest) {
         return res.status(404).json({
            message: "Connection request not found...",
         });
      }

      connectRequest.status = status;
      const data = await connectRequest.save();
      res.json({
         message: "Connection request " + status,
         data,
      });
   } catch (err) {
      res.status(400).send("ERROR: " + err.message);
   }
});

module.exports = { requestRouter };
