const mongoose = require("mongoose");

async function connectMongoDB(URL = process.env.URL) {
  return mongoose.connect(URL);
}
module.exports = {
  connectMongoDB,
};
