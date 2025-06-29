const mongoose = require("mongoose");
const itemsModel = require("../models/itemsModel");
const connect = require("../db/connect");

const items = [
  {
    name: "Brown Eggs",
    category: "dairy",
    price: 28.1,
    image: "https://kenya-shop.com/wp-content/uploads/2024/09/egg-brown.jpg",
    quantity: 60,
    unitWeight: "dozen",
    updatedBy: "admin",
  },
  {
    name: "Sweet fresh stawberry",
    category: "fruit",
    price: 29.45,
    image:
    "https://www.shutterstock.com/image-photo/two-juicy-ripe-strawberries-one-260nw-2575637269.jpg",
    quantity: 5,
    unitWeight: "kg",
    updatedBy: "admin",
  },
];

async function insertItems() {
  try {
    const itemNames = items.map((item) => item.name);
    const existingItems = await itemsModel.find(
      { name: { $in: itemNames } },
      { name: 1 }
    );
    const existingNames = new Set(existingItems.map((item) => item.name));
    const newItems = items.filter((item) => !existingNames.has(item.name));

    if (newItems.length > 0) {
      const res = await itemsModel.insertMany(newItems);
      console.log("Inserted items:", res);
    } else {
      console.log("No new items to insert.");
    }
    // const res = await itemsModel.insertMany(items);
  } catch (err) {
    console.error("Error inserting items:", err);
  } finally {
    // Always close connection
    await mongoose.disconnect();
    console.log("MongoDB connection closed.");
  }
}


async function dropCollection() {
  try {
    const deleteResult = await itemsModel.deleteMany({})
  } catch (err) {
      console.error("Error inserting items:", err);
    } finally {
      // Always close connection
      await mongoose.disconnect();
      console.log("MongoDB connection closed.");
    }
}
// dropCollection();
insertItems();



module.exports = [items, insertItems];
