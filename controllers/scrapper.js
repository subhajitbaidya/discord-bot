// Test
const { Scrapper } = require("../services/scrapper.js");
const ScrapedData = require("../models/scrapper.js");

async function ScrapTextData(req, res) {
  try {
    const data = await ScrapedData.find({});
    res.status(200).json({ data: data });
  } catch (error) {
    console.error("Error scraping:", error.message);
    res.status(500).send("Error scraping website");
  }
}

module.exports = {
  ScrapTextData,
};
