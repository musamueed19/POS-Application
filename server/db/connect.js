const mongoose = require("mongoose");

// console.log(process.env.MONGOURI);

async function connect() {
  await mongoose
    .connect(
      process.env.MONGOURI ||
        "mongodb+srv://musavuswh:QS68GdEhJQ2tvHBT@cluster0.bcuj76p.mongodb.net/sheypos?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then((res) => console.log("SUCCESS --- " + res))
    .catch((err) => console.log("ERROR --- " + err));
}

connect();

module.exports = connect;
