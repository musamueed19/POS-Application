const mongoose = require("mongoose");

// console.log(process.env.MONGOURI);

async function connect() {
  await mongoose
    .connect(process.env.MONGOURI)
    .then((res) => console.log("SUCCESS --- " + res))
    .catch((err) => console.log("ERROR --- " + err));
}

connect();

module.exports = connect;
