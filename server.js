const app = require("./index.js");
const port = 3000;
//database connection
const connectionString = "mongodb+srv://emekaobioji23:1nctamtw30pclut@emekaobiojicluster0.epxqrrm.mongodb.net/?retryWrites=true&w=majority&appName=emekaobiojicluster0"
const mongoose = require('mongoose');
try {
  mongoose.connect(connectionString);
  console.log("connected to Mongo");
} catch (error) {
  console.log("did not connect to Mongo");
}
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })