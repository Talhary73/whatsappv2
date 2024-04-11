const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.log(err);
    throw new Error("Unable to connect");
  }
};
module.exports = connect;
