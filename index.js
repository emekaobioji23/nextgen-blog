//imports
const express = require('express');
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");
const { auth } = require('express-openid-connect');


//configurations
const app = express();
app.use(express.json());
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET_TOKEN,
  baseURL: process.env.baseURL,
  clientID: process.env.clientID,
  issuerBaseURL: process.env.issuerBaseURL
};

//routes
app.use(auth(config));// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use("/api/users",userRoutes);
app.use("/api/blogs",blogRoutes);
// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
app.use("*", (req, res, next) => {
  console.log(`route ${req.baseUrl} not found`);
  res.status(404).json({
    message: "Not found",
  });
});

module.exports = app;

