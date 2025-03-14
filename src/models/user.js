const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
   {
      firstName: {
         type: String,
         required: true,
         minLength: 4,
      },
      lastName: {
         type: String,
      },
      emailId: {
         type: String,
         trim: true,
         lowercase: true,
         required: true,
         unique: true,
         validate(value) {
            if (!validator.isEmail(value)) {
               throw new Error("Invalid email address: " + value);
            }
         },
      },
      password: {
         type: String,
         required: true,
         validate(value) {
            if (!validator.isStrongPassword(value)) {
               throw new Error("Enter a strong password: " + value);
            }
         },
      },
      age: {
         type: Number,
         min: 18,
      },
      gender: {
         type: String,
         validate(value) {
            // by default this validate will only work for new object which will be added not for existing object
            if (!["male", "female", "others"].includes(value)) {
               throw new Error("Gender data is not valid...");
            }
         },
      },
      photoUrl: {
         type: String,
         validate(value) {
            if (!validator.isURL(value)) {
               throw new Error("Invalid Photo URL: " + value);
            }
         },
      },
      about: {
         default: "This is a default about the user..",
         type: String,
      },
      skills: {
         type: [String],
      },
   },
   {
      timestamps: true,
   }
);

// creating a model
// const User = mongoose.model("User", userSchema);

// module.exports = User;
module.exports = mongoose.model("User", userSchema);
