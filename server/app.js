// express import
const express = require("express");

// dotenv import
const env = require("dotenv");
// dotenv.config()
env.config();

// MongoDB connect
const connect = require("./db/connect");

// cors import
const cors = require("cors");

// routes
const itemsRoute = require("./routes/itemsRoute");
const usersRoute = require("./routes/usersRoute");

// start express app
const app = express();
const port = process.env.PORT || 5000;

// CORS
// Enable CORS for all routes
app.use(
  cors({
    // Allow all origins (replace with your frontend URL in production)
    origin: ["*", "https://igpos.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("Hello, World");
});

// express.json() - to accept the parmeters from the frontend
app.use(express.json());

// items route config
app.use("/api/v0/items", itemsRoute);
app.use("/api/v0/users", usersRoute);

app.listen(port, () => console.log(`Server running on port ${port}`));
