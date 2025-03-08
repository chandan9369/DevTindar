const express = require("express");
const app = express();

// app.get() only work to handle get request
app.get("/", (req, res) => {
   res.send("hii, from bunny :)");
});
// // using app.use() will match all the http method
// app.use("/test", (req, res) => {
//    res.send("hii");
// });

app.listen(3000, () => {
   console.log("http://localhost:3000");
});
