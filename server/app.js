// express import
const express = require("express");

// dotenv import
const env = require("dotenv");
// dotenv.config()
env.config();

// MongoDB connect
const connect = require("./db/connect");


// items route
const itemsRoute = require('./routes/itemsRoute')

// start express app
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello, World");
});

// express.json() - to accept the parmeters from the frontend
app.use(express.json())

// items route config
app.use('/api/v0/items', itemsRoute)



app.listen(port, () => console.log(`Server running on port ${port}`));
