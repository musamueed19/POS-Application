const express = require("express");

const router = express.Router();

const itemsModel = require("../models/itemsModel");

// Fix the parameter order: (req, res)
// GET
router.get("/", async (req, res) => {
  try {
    // Admins can pass ?status=active,inactive,archived
    const statusFilter = req.query.status
      ? { status: { $in: req.query.status.split(",") } }
      : { status: "active" }; // Default for regular users
    
    // now find the parameters
    const items = await itemsModel.find(statusFilter);
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
});

// now addItems route
// POST
router.post("/", async (req, res) => {
  try {

    const existingItem = await itemsModel.findOne({ name: req.body.name })
  
    if (existingItem) {
      res.status(400).send({
        success: false,
        message: `Item Name "${existingItem.name}" already Exists`,
        item: existingItem
      });
      return
    }
    const newItem = new itemsModel(req.body)
    const item = await newItem.save();
    if(item) {

      // item added successfully
      res.send({
        success: true,
        message: "Item added successfully",
        item
      })
    }
    else {
      res.status(400).send({
        success: false,
        message: "Error adding new item",
        item
      })

    }


  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message || error
    })
  }
})


// now addItems route
// PUT
router.put("/:id", async (req, res) => {
  try {
    const itemId = req.params.id;

    // Check if another item with the same name but different ID exists
    const existingItem = await itemsModel.findOne({
      name: req.body.name,
      _id: { $ne: itemId }, // $ne means "not equal"
    });

    if (existingItem) {
      return res.status(400).send({
        success: false,
        message: `Item Name "${existingItem.name}" already exists`,
        item: existingItem,
      });
    }

    // Update the item
    const updatedItem = await itemsModel.findByIdAndUpdate(
      itemId,
      {...req.body, updatedAt: new Date},
      { new: true } // Return the updated document
    );

    if (!updatedItem) {
      return res.status(404).send({
        success: false,
        message: "Item not found",
      });
    }

    res.send({
      success: true,
      message: "Item updated successfully",
      item: updatedItem,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message || "Error updating item",
    });
  }
});


// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const itemId = req.params.id;

    // Update the item
    const deletedItem = await itemsModel.findByIdAndUpdate(
      itemId,
      {status: "archived", archivedAt: new Date, updatedAt: new Date},
      { new: true } // Return the updated document
    );

    if (!deletedItem) {
      return res.status(404).send({
        success: false,
        message: "Item not found",
      });
    }

    res.send({
      success: true,
      message: "Item deleted successfully",
      item: deletedItem,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message || "Error updating item",
    });
  }
});




















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
