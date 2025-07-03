const express = require("express");

const mongoose = require("mongoose");

const router = express.Router();

const itemsModel = require("../models/itemsModel");
const usersModel = require("../models/usersModel");
const billsModel = require("../models/billsModel");

// Fix the parameter order: (req, res)
// GET
// req.body
// {
//   "customerName": "Muhammad Musa Mueed",
//   "subTotal": 585,
//   "phoneNumber": "+923020949071",
//   "paymentMode": "online",
//   "tax": 47.97,
//   "grandTotal": 537.03,
//   "updatedBy": "6863fa662785439044cb6030",
//   "cartItems": [itemsModel]
// }
router.post("/", async (req, res) => {
  try {
    const newBill = new billsModel(req.body);
    const bill = await newBill.save();

    // console.log(req.body);

    if (bill)
      return res.send({
        success: true,
        message: "Bill Generated Successfully",
        bill,
      });
    else return res.status(400).send({
      success: false,
      message: "Failed to generate Bill",
      bill,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
});


// All Bills
// GET
router.get("/", async (req, res) => {
  try {
    const bills = await billsModel.find();

    if (bills)
      return res.send({
        success: true,
        message: bills,
        bills,
      });
    else
      return res.status(400).send({
        success: false,
        message: "Failed to get Bills",
        bills,
      });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
