const validator = require("validator");

const validateSignUpData = (req) => {
   const { firstName, lastName, emailId, password } = req.body;

   if (!firstName || !lastName) {
      throw new Error("Invalid name !!!");
   } else if (!validator.isEmail(emailId)) {
      throw new Error("Invalid Email ID !!!");
   } else if (!validator.isStrongPassword(password)) {
      throw new Error("Enter some strong password !!!");
   }
};

module.exports = validateSignUpData;
