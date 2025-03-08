const adminAuth = (req, res, next) => {
   const token = "xyz";
   const isAdminAuthorized = token === "xyz";
   if (!isAdminAuthorized) {
      res.status(401).send("Unauthorized request !!");
   } else {
      res.send("Next handler!!!");
      next();
   }
};
const userAuth = (req, res, next) => {
   console.log("User auth is getting checking...");
   const token = "xyz";
   const isAdminAuthorized = token === "xyz";
   if (!isAdminAuthorized) {
      res.status(401).send("Unauthorized request !!");
   } else {
      next();
   }
};
module.exports = {
   adminAuth,
   userAuth,
};
