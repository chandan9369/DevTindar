const validator = require("validator");

const validateSignUpData = (req) => {
   const { firstName, lastName, emailId, password } = req.body;

   if (!firstName && !lastName) {
      throw new Error("Invalid name !!!");
   } else if (!validator.isEmail(emailId)) {
      throw new Error("Invalid Email ID !!!");
   } else if (!validator.isStrongPassword(password)) {
      throw new Error("Enter some strong password !!!");
   }
};

const validateEditProfileData = (req) => {
   const allowedEditFields = ["age", "gender", "photoUrl", "firstName", "lastName", "about", "skills"];

   const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));
   return isEditAllowed;
};

module.exports = { validateSignUpData, validateEditProfileData };
