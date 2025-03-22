const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
   {
      fromUserId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User", // reference to the user collection
         required: true,
      },
      toUserId: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "User",
      },
      status: {
         type: String,
         required: true,
         enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`,
         },
      },
   },
   { timestamps: true }
);

// now, whenever these to combined searched wit will be very fast, as we have created them index
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre("save", function (next) {
   // Check : if fromUserId & toUserId should be different
   if (this.fromUserId.equals(this.toUserId)) {
      throw new Error("Can't send connection request to yourself...");
   }
   next();
});

const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = { ConnectionRequest };
