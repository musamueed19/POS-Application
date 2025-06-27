// express import
const express = require("express");

// dotenv import
const env = require("dotenv");
// dotenv.config()
env.config();

// MongoDB connect
const { connect } = require("./db/connect");
connect();


// start express app
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, WOrld");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
