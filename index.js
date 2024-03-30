//imports
const express = require('express');
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");

//configurations
const app = express();
app.use(express.json());

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