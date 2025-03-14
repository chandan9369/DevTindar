// url : mongodb+srv://bunny2310:8bGHcUEVcU32CgIj@bunny.4xph7.mongodb.net/
const mongoose = require("mongoose");

const connectDB = async () => {
   await mongoose.connect("mongodb+srv://bunny2310:3lvMSEkOQlr2oMrp@bunny.4xph7.mongodb.net/devTinder");
};

module.exports = { connectDB };
