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

// now addItems route

router.post("/", async (req, res) => {
  try {
    const newItem = new itemsModel(req.body)
    await newItem.save()

    // item added successfully
    res.send({
      success: true,
      message: "Item added successfully"
    })


  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message || error
    })
  }
})


// now get OneRecord
router.get("/:id", async (req, res) => {
  try {
    // get item based on id
    const items = await itemsModel.find();
    console.log(items);
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
})

module.exports = router; // No need to wrap it in an object
