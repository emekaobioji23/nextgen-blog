//imports
const express = require('express');
const userRoutes = require("./routes/user")

//configurations
const app = express();
app.use(express.json());

//routes
app.use("/api/users",userRoutes)
app.use("*", (req, res, next) => {
  res.status(404).json({
    message: "Not found",
  });
});

module.exports = app;
//assignment
//create an endpoint for a blog
