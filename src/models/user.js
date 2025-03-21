const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
   {
      firstName: {
         type: String,
         required: true,
         index: true,
         minLength: 4,
         maxLength: 59,
      },
      lastName: {
         type: String,
      },
      emailId: {
         unique: true, // will make emaild ID index for DB no need to do index:true
         type: String,
         trim: true,
         lowercase: true,
         required: true,
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
         enum: {
            values: ["male", "female", "others"],
            message: `{VALUE} is not a valid gender type...`,
         },
         // validate(value) {
         //    // by default this validate will only work for new object which will be added not for existing object
         //    if (!["male", "female", "others"].includes(value)) {
         //       throw new Error("Gender data is not valid...");
         //    }
         // },
      },
      photoUrl: {
         type: String,
         default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQABqQIdskCD9BK0I81EbVfV9tTz320XvJ35A&s",
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

// Compound DB index
userSchema.index({ firstName: 1, lastName: 1 });

userSchema.methods.validatePassword = async function (passwordInputByUser) {
   const passwordHash = this.password;
   const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
   return isPasswordValid;
};
userSchema.methods.getJWT = async function () {
   const token = await jwt.sign({ _id: this._id }, "DEV@#TINDER23", {
      expiresIn: "1d",
   });
   return token;
};

// creating a model
// const User = mongoose.model("User", userSchema);

// module.exports = User;
module.exports = mongoose.model("User", userSchema);
