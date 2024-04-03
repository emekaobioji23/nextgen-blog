//imports
const express = require('express');
require("dotenv").config();

const userRoutes = require("./routes/user-route");
const blogRoutes = require("./routes/blog-route");
const cookieParser = require('cookie-parser');


//configurations
const app = express();
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/users",userRoutes);
app.use("/api/blogs",blogRoutes);

app.use("*", (req, res, next) => {
  console.log(`route ${req.baseUrl} not found`);
  res.status(404).json({
    message: "Not found",
  });
});

module.exports = app;

