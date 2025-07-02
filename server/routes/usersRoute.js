const express = require("express");

const router = express.Router();

const usersModel = require("../models/usersModel");

// Register
// POST
router.post("/register", async (req, res) => {
  try {
    const existingUser = await usersModel.findOne({
      email: req.body.email,
    });

    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User with this email already exists",
        user: existingUser,
      });
    }

    //   new user
    const newUser = new usersModel({ ...req.body, verified: false });
    const item = await newUser.save();

    if (item) {
      return res.send({
        success: true,
        message: "Registration Successful",
        user: item,
      });
      }
    else {
        return res.status(400).send({
          success: false,
          message: "Error registering user",
          user: item,
        });
      }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message || "Error updating user",
    });
  }
});

// Login
// POST
router.post("/", async (req, res) => {
  try {
    const existingUser = await usersModel.findOne({
      email: req.body.email,
    });

    if (!existingUser) {
      return res.status(400).send({
        success: false,
        message: "User with this Email does not Exists",
        user: existingUser,
      });
    }

    // Convert Mongoose document to a plain JS object first
    const userObject = existingUser.toObject();

    // Now destructure to remove password
    const { password, ...user } = userObject;

    if (existingUser.password === req.body.password) {
      return res.send({
        success: true,
        message: "Login Successful",
        user,
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Wrong Password",
        user: existingUser,
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message || "Error updating user",
    });
  }
});


// usersRoute exports
module.exports = router;
