const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

const ScrapedData = mongoose.model("webscrapes", dataSchema);
module.exports = ScrapedData;