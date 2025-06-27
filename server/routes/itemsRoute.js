const express = require("express");

const router = express.Router();

const itemsModel = require("../models/itemsModel");

// Fix the parameter order: (req, res)
router.get("/", async (req, res) => {
  try {
    const items = await itemsModel.find();
    console.log(items)
    res.send({
      success: true,
      message: items,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message || error,
    });
  }
});

module.exports = router; // No need to wrap it in an object
